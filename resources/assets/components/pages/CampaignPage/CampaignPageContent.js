import React from 'react';
import { find, get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NotFound from '../../NotFound';
import ScrollConcierge from '../../ScrollConcierge';
import ContentfulEntry from '../../ContentfulEntry';
import { CallToActionContainer } from '../../CallToAction';
import SchoolFinderContainer from '../../utilities/SchoolFinder/SchoolFinderContainer';
import TextContent from '../../utilities/TextContent/TextContent';
import { isCampaignClosed, parseContentfulType } from '../../../helpers';
import { SCHOOL_FINDER_CAMPAIGN_IDS } from '../../../constants/school-finder';

const CampaignPageContent = props => {
  const { campaignId, campaignEndDate, match, pages } = props;

  const subPage = find(pages, page =>
    page.type === 'page' ? page.fields.slug.endsWith(match.params.slug) : false,
  );

  if (!subPage) {
    return <NotFound />;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  const renderBlock = json => {
    const type = parseContentfulType(json);

    // @TODO (2018-10-11) Would like to rethink this approach with fullWidth.
    let fullWidth = false;
    if (
      [
        'photoSubmissionAction',
        'gallery',
        'postGallery',
        'imagesBlock',
        'socialDriveAction',
      ].includes(type)
    ) {
      fullWidth = true;
    }

    // Only setting full column width for Content Blocks with an image
    if (type === 'contentBlock' && get(json.fields.image, 'url')) {
      fullWidth = true;
    }

    return (
      <div
        key={json.id}
        id={`block-${json.id}`}
        className={classnames(
          'margin-bottom-lg',
          'margin-horizontal-md',
          'clear-both',
          {
            primary: !fullWidth,
          },
        )}
      >
        <ContentfulEntry json={json} />
      </div>
    );
  };

  const { content, sidebar, blocks } = subPage.fields;

  return (
    <div className="campaign-page" id={subPage.id}>
      <ScrollConcierge />
      {content ? (
        <div className="row">
          <div className="primary">
            <TextContent className="margin-horizontal-md">
              {content}
            </TextContent>
          </div>
          {sidebar.length ? (
            <div className="secondary">
              {sidebar.map(block => (
                <div
                  className="margin-bottom-lg margin-horizontal-md"
                  key={block.id}
                >
                  <ContentfulEntry json={block} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="blocks clear-both">
        {SCHOOL_FINDER_CAMPAIGN_IDS.includes(campaignId) ? (
          <SchoolFinderContainer />
        ) : null}
        {blocks.map(block => renderBlock(block))}
      </div>

      {isClosed ? null : (
        <CallToActionContainer
          useCampaignTagline
          visualStyle="transparent"
          hideIfSignedUp
        />
      )}
    </div>
  );
};

CampaignPageContent.propTypes = {
  campaignEndDate: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }),
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        content: PropTypes.string,
        blocks: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
  ),
};

CampaignPageContent.defaultProps = {
  campaignEndDate: null,
  pages: [],
  match: {
    params: {},
  },
};

export default CampaignPageContent;
