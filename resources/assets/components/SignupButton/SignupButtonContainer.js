import { connect } from 'react-redux';
import { get } from 'lodash';

import SignupButton from './SignupButton';
import { storeCampaignSignup } from '../../actions/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affiliateMessagingOptIn: state.signups.affiliateMessagingOptIn,
  campaignActionText: state.campaign.actionText,
  campaignId: state.campaign.campaignId,
  campaignTitle: state.campaign.title,
  pageId: state.campaign.id || state.page.id,
  disableSignup: get(state.campaign, 'additionalContent.disableSignup', false),
  sourceActionText: get(state.campaign, 'additionalContent.sourceActionText'),
  trafficSource: state.user.source,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  storeCampaignSignup,
};

// Export the container component.
export default connect(
  mapStateToProps,
  actionCreators,
)(SignupButton);
