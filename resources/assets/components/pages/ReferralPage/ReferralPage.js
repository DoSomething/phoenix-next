import React from 'react';
import PropTypes from 'prop-types';

import CampaignLink from './ReferralPageCampaignLink';

const ReferralPage = props => {
  return (
    <div>
      <div className="main clearfix general-page">
        <div className="default-container margin-vertical">
          <div className="general-page__heading text-center">
            <h1 className="general-page__title caps-lock">
              Hi, {props.firstName}’s friend!
            </h1>
          </div>
          <p>
            {props.firstName} just signed up for this campaign from
            DoSomething.org. Once you and {props.firstName} complete the
            campaign, you’ll both earn a $5 gift card!
          </p>
          <CampaignLink
            campaignId={props.primaryCampaignId}
            userId={props.userId}
          />
        </div>
      </div>
    </div>
  );
};

ReferralPage.propTypes = {
  firstName: PropTypes.string.isRequired,
  primaryCampaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ReferralPage;
