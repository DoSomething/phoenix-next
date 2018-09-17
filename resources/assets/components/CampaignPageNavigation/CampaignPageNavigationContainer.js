import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isCampaignClosed } from '../../helpers';
import { isSignedUp } from '../../selectors/signup';
import CampaignPageNavigation from './CampaignPageNavigation';

const mapStateToProps = state => ({
  isAffiliated: isSignedUp(state),
  isCampaignClosed: isCampaignClosed(state.campaign.endDate),
  isLegacyTemplate: Boolean(state.campaign.template === 'legacy'),
  pages: state.campaign.pages,
  campaignSlug: state.campaign.slug,
});

export default withRouter(connect(mapStateToProps)(CampaignPageNavigation));
