/* eslint-disable no-restricted-syntax, no-await-in-loop, no-continue */

const fetch = require('node-fetch');
const { map, reject } = require('lodash');

const { contentManagementClient } = require('./contentManagementClient');
const {
  createLogger,
  getField,
  withFields,
  linkReference,
  constants,
  sleep,
} = require('./helpers');

const { LOCALE } = constants;

const { NORTHSTAR_URL } = process.env;
const logger = createLogger('create_post_galleries');

contentManagementClient.init(async environment => {
  logger.info(
    `Running 'create_post_galleries', using Contentful's '${environment.sys.id}' environment & '${NORTHSTAR_URL}'.`,
  );
  logger.info('Kicking things off in 5 seconds...');

  await sleep(5000);

  const blocks = await environment.getEntries({
    content_type: 'customBlock',
    'fields.type': 'gallery',
  });

  for (let i = 0; i < blocks.items.length; i += 1) {
    const customBlock = blocks.items[i];

    // Find all Entries which link to this custom block.
    const linkedEntries = await environment.getEntries({
      links_to_entry: customBlock.sys.id,
    });

    const internalTitle = getField(customBlock, 'internalTitle');
    logger.info(
      `\n\nProcessing ${linkedEntries.items.length} links to "${internalTitle}".`,
    );

    for (let j = 0; j < linkedEntries.items.length; j += 1) {
      const page = linkedEntries.items[j];
      const id = page.sys.id;

      const isPageArchived = await page.isArchived();
      if (isPageArchived) {
        logger.info(`⇢ Skipping '${id}', archived.`);
        continue;
      }

      // Cool it a bit to avoid the rate-limit police:
      await sleep(500);

      // Get the campaign ID for this action page:
      const campaignQuery = await environment.getEntries({
        links_to_entry: page.sys.id,
        limit: 1,
      });

      const campaign = campaignQuery.items[0];
      const campaignId = getField(campaign, 'legacyCampaignId');

      const pageTitle = getField(page, 'internalTitle');
      logger.info(`Looking at "${pageTitle}" (${campaignId})`);

      // Get the action ID from the first `photo` action for this campaign.
      const response = await fetch(
        `${NORTHSTAR_URL}/api/v3/actions?filter[campaign_id]=${campaignId}`,
      );

      const { data } = await response.json();
      const actions = data.filter(action =>
        ['photo', 'text'].includes(action.post_type),
      );
      const actionIds = map(actions, 'id');

      if (actionIds.length === 0) {
        logger.info(
          `⇢ Skipping '${id}', could not find any photo/text actions.`,
        );
        continue;
      }

      // Create a new Post Gallery entity for this action.
      const galleryTitle = `${getField(campaign, 'internalTitle')} Gallery`;
      const gallery = await environment.createEntry(
        'postGallery',
        withFields({
          internalTitle: galleryTitle,
          actionIds: actionIds.map(String),
          itemsPerRow: 3,
          filterType: 'none',
          hideReactions: false,
        }),
      );

      await gallery.publish();

      const actionList = `#${actionIds.join(', #')}`; // e.g. #1, #2, #3
      logger.info(
        `→ Created "${galleryTitle}" (${gallery.sys.id} for ${actionList}).`,
      );

      // Replace the link to the custom block with our new post gallery:
      const customBlockIndex = page.fields.blocks[LOCALE].findIndex(
        block => block.sys.id === customBlock.sys.id,
      );

      const newLink = linkReference(gallery.sys.id);
      page.fields.blocks[LOCALE].splice(customBlockIndex, 1, newLink);

      // Make sure that we don't publish an unpublished campaign by mistake:
      const wasPublished = await page.isPublished();
      const updatedPage = await page.update();

      if (!updatedPage) {
        logger.error(`→ Could not update reference for "${pageTitle}".`);
        continue;
      }

      if (!wasPublished) {
        logger.warn(`→ Needs review: ${updatedPage.sys.id}`);
        continue;
      }

      const publishedPage = await updatedPage.publish();

      if (publishedPage) {
        logger.info(
          `✔ Published "${pageTitle}": https://qa.dosomething.org/us/campaigns/${publishedPage.fields.slug[LOCALE]}`,
        );
      }
    }
  }
});
