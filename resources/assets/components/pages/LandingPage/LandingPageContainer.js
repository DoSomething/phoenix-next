import { get } from 'lodash';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  // @TODO: while we have landing pages as either a page content type
  // or a landingPage content type, the ownProps is structured a bit
  // differently. Revise once all landing pages use landingPage type.
  const landingPage = get(ownProps, 'landingPage.fields', ownProps);

  return {
    additionalContent: landingPage.additionalContent,
    affiliateCreditText: get(
      state,
      'campaign.additionalContent.affiliateCreditText',
      undefined,
    ),
    affiliateSponsors: state.campaign.affiliateSponsors,
    campaignId: state.campaign.campaignId,
    contentfulId: state.campaign.id,
    content: landingPage.content,
    coverImage: state.campaign.coverImage,
    endDate: state.campaign.endDate,
    scholarshipAmount: state.campaign.scholarshipAmount,
    scholarshipDeadline: state.campaign.scholarshipDeadline,
    showPartnerMsgOptIn: get(
      state.campaign.additionalContent,
      'displayAffilitateOptOut',
      false,
    ),
    sidebar: landingPage.sidebar,
    signupArrowContent: get(
      state.campaign.additionalContent,
      'signupArrowContent',
      null,
    ),
    subtitle: state.campaign.callToAction,
    tagline: get(state.campaign.additionalContent, 'tagline'),
    title: state.campaign.title,
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(LandingPage);
