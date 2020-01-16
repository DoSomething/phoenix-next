import React from 'react';
import PropTypes from 'prop-types';

<<<<<<< HEAD
import Enclosure from '../../Enclosure';
=======
import ContentfulEntry from '../../ContentfulEntry';
>>>>>>> Last of the cleanup and updating stragglers. Also removing Enclosure component.
import CampaignPageContent from './CampaignPageContent';
import { CallToActionContainer } from '../../CallToAction';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-page.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignPage = props => {
  const { entryContent, isCampaignClosed } = props;

  return (
    <>
      <article className="campaign-page">
        <LedeBannerContainer
          displaySignupButton={Boolean(!entryContent)}
          isClosed={isCampaignClosed}
        />

        <div className="clearfix relative">
          {!isCampaignClosed && !entryContent ? (
            <CampaignPageNavigationContainer />
          ) : null}

          <div className="md:w-3/4 mx-auto mt-6 mb-6">
            {/* @TODO: after Action page migration, refactor and combine CampaignPage & CampaignSubPage and render Contentful Entry within CampaignPage component */}
            {!entryContent ? (
              <CampaignPageContent {...props} />
            ) : (
              <ContentfulEntry json={entryContent} />
            )}
          </div>
          {!entryContent ? (
            <CallToActionContainer className="md:hidden" hideIfSignedUp />
          ) : null}
        </div>
      </article>
      <CampaignInfoBarContainer />
    </>
  );
};

CampaignPage.propTypes = {
  entryContent: PropTypes.object,
  isCampaignClosed: PropTypes.bool,
  landingPage: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  shouldShowLandingPage: PropTypes.bool.isRequired,
};

CampaignPage.defaultProps = {
  entryContent: null,
  isCampaignClosed: false,
  landingPage: null,
};

export default CampaignPage;
