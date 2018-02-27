import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../../Dashboard';
import Enclosure from '../../Enclosure';
import { FeedContainer } from '../../Feed'; // @TODO: rename to ActivityFeed or ActivityPage...
import { QuizContainer } from '../../Quiz';
import ActivityFeedBlock from '../../ActivityFeedBlock';
import { isCampaignClosed } from '../../../helpers';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import { ActionPageContainer } from '../ActionPage';
import { CallToActionContainer } from '../../CallToAction';
import { CampaignSubPageContainer } from '../CampaignSubPage';
import TabbedNavigationContainer from '../../Navigation/TabbedNavigationContainer';
import CampaignFooter from '../../CampaignFooter';
import { CONTENT_MODAL, REPORTBACK_UPLOADER_MODAL } from '../../Modal';

// TODO: If they click a modal link from the action page, this takes them to the root /.
// We should probably make a solution that lets them stay on the page they were already at.

const CampaignPage = (props) => {
  const {
    affiliatePartners, affiliateSponsors, campaignLead,
    dashboard, endDate, hasActivityFeed, isAffiliated, match,
    openModal, shouldShowActionPage, slug, template, totalCampaignSignups,
  } = props;

  const isClosed = isCampaignClosed(get(endDate, 'date', null));

  /*
    If the campaign is closed (and an admin has not specifically
    toggled the show Action Page button), we want to render the ActivityFeed (community page)
    *if* it's available (meaning the campaign has an activity feed property populated).
    Otherwise, we render the ActionPage as usual.
  */
  const shouldShowActivityFeed = isClosed && ! shouldShowActionPage && hasActivityFeed;
  const ActionPageOrActivityFeed = () => (shouldShowActivityFeed ? (
    <Redirect to={`${match.url}/community`} />
  ) : (
    <ActionPageContainer />
  ));

  return (
    <div>
      <LedeBannerContainer />

      <div className="main clearfix">
        { dashboard ?
          <Dashboard
            totalCampaignSignups={totalCampaignSignups}
            content={dashboard}
            endDate={endDate}
          />
          : null }

        <TabbedNavigationContainer campaignSlug={slug} />

        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <Switch>
            <Route
              path={`${match.url}`}
              exact
              component={ActionPageOrActivityFeed}
            />
            <Route
              path={`${match.url}/action`}
              component={ActionPageOrActivityFeed}
            />
            <Route
              path={`${match.url}/community`}
              render={() => {
                // Does this campaign have an activity feed? (Some on the
                // "legacy" template don't.) If not, redirect to action page.
                if (template === 'legacy' && ! hasActivityFeed) {
                  return <Redirect to={`${match.url}/action`} />;
                }

                return <FeedContainer />;
              }}
            />
            <Route path={`${match.url}/pages/:slug`} component={CampaignSubPageContainer} />
            <Route path={`${match.url}/blocks/:id`} component={ActivityFeedBlock} />
            <Route path={`${match.url}/quiz/:slug`} component={QuizContainer} />
            <Route
              path={`${match.url}/modal/:id`}
              render={(routingProps) => {
                const { id } = routingProps.match.params;

                switch (id) {
                  case 'reportback':
                    openModal(REPORTBACK_UPLOADER_MODAL);
                    break;
                  default:
                    openModal(CONTENT_MODAL, id);
                    break;
                }

                return <Redirect to={`${match.url}`} />;
              }}
            />
            { /* If no route matches, just redirect back to the main page: */ }
            <Redirect from={`${match.url}/:anything`} to={`${match.url}`} />
          </Switch>
        </Enclosure>
        { ! isAffiliated ? <CallToActionContainer key="callToAction" className="-sticky" /> : null }
      </div>

      <CampaignFooter
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
        campaignLead={campaignLead}
      />
    </div>
  );
};

CampaignPage.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  endDate: PropTypes.shape({
    date: PropTypes.string,
    timezone: PropTypes.string,
    timezone_type: PropTypes.number,
  }),
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  isAffiliated: PropTypes.bool,
  hasActivityFeed: PropTypes.bool.isRequired,
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  affiliatePartners: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  slug: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
  totalCampaignSignups: PropTypes.number,
  openModal: PropTypes.func.isRequired,
  shouldShowActionPage: PropTypes.bool.isRequired,
};

CampaignPage.defaultProps = {
  dashboard: null,
  endDate: null,
  isAffiliated: false,
  totalCampaignSignups: 0,
  campaignLead: null,
};

export default CampaignPage;
