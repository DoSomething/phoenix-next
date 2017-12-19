import { connect } from 'react-redux';
import { get } from 'lodash';
import { PuckConnector } from '@dosomething/puck-client';
import ReportbackUploader from './ReportbackUploader';
import {
  addSubmissionItemToList, submitReportback,
  toggleReportbackAffirmation,
} from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
  submissions: state.submissions,
  noun: get(state.campaign.additionalContent, 'noun'),
  uploads: state.uploads,
  shouldShowAffirmation: state.submissions.shouldShowAffirmation,
  friendReferralRB: get(state.campaign.additionalContent, 'friendReferralRB'),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  addSubmissionItemToList,
  submitReportback,
  toggleReportbackAffirmation,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(PuckConnector(ReportbackUploader));
