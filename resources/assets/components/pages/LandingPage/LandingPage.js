/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Enclosure from '../../Enclosure';
import PitchTemplate from './templates/PitchTemplate';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CallToActionContainer from '../../CallToAction/CallToActionContainer';
import SixpackExperimentContainer from '../../utilities/SixpackExperiment/SixpackExperimentContainer';

import './landing-page.scss';

const LandingPage = props => {
  const {
    campaignId,
    pitchContent,
    showPartnerMsgOptIn,
    sidebar,
    signupArrowContent,
    tagline,
  } = props;

  const sidebarCTA = sidebar[0] && sidebar[0].fields;

  return (
    <div>
      {campaignId === '3pwxnRZxociqMaQCMcGOyc' ? (
        <SixpackExperimentContainer
          title="LedeBanner Layout Experiment"
          convertableActions={['signup']}
          alternatives={[
            <LedeBannerContainer testName="Mosaic Layout Template" />,
            <LedeBannerContainer
              testName="Jumbo Layout Template"
              coverImage={{
                url:
                  'https://images.ctfassets.net/81iqaqpfd8fy/6TaMCndXygSscGkOWKg6uY/6f0829ba82220be1f5ec501a41870e99/LYVC_Test_Banner.jpg',
              }}
              template="jumbo"
            />,
          ]}
        />
      ) : (
        <LedeBannerContainer
          signupArrowContent={signupArrowContent}
          showPartnerMsgOptIn={showPartnerMsgOptIn}
        />
      )}

      <div className="clearfix bg-white">
        <Enclosure className="default-container margin-lg pitch-landing-page">
          <PitchTemplate pitchContent={pitchContent} sidebarCTA={sidebarCTA} />
        </Enclosure>

        <CallToActionContainer content={tagline} sticky />
      </div>

      <PuckWaypoint name="landing_page_cta-top" />
      <CallToActionContainer
        className="legacy border-top border-radius-none bg-off-white padding-lg hide-on-mobile"
        content={tagline}
      />
      <PuckWaypoint name="landing_page_cta-bottom" />

      <div className="info-bar -dark">
        <div className="wrapper">
          A DoSomething.org campaign. Join over 6 million members taking action.
          Any cause, anytime, anywhere.
        </div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  campaignId: PropTypes.string.isRequired,
  pitchContent: PropTypes.string.isRequired,
  showPartnerMsgOptIn: PropTypes.bool,
  sidebar: PropTypes.arrayOf(PropTypes.object),
  signupArrowContent: PropTypes.string,
  tagline: PropTypes.string,
};

LandingPage.defaultProps = {
  showPartnerMsgOptIn: false,
  sidebar: null,
  signupArrowContent: null,
  tagline: 'Ready to start?',
};

export default LandingPage;
