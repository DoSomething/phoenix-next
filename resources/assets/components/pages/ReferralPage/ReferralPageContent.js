import React from 'react';
import PropTypes from 'prop-types';

import CampaignLink from './ReferralPageCampaignLink';

// @TODO: Allow override via config variables.
const SECONDARY_CAMPAIGN_ID = 7951;
const SECONDARY_CAMPAIGN_PROMPT =
  'In less than 5 minutes, you can join 193,242 young people putting an end to gun violence.';

const ReferralPageContent = props => {
  const { firstName, primaryCampaignId, userId } = props;
  return (
    <div>
      <div className="main clearfix general-page">
        <div className="default-container margin-vertical">
          <div className="general-page__heading text-center">
            <h1 className="general-page__title caps-lock">
              Hi, {firstName}’s friend!
            </h1>
          </div>
          <p>
            {firstName} just signed up for this campaign from DoSomething.org.
            Once you and {props.firstName} complete the campaign, you’ll both
            earn a $5 gift card!
          </p>
          {props.primaryCampaignId ? (
            <div>
              <CampaignLink campaignId={primaryCampaignId} userId={userId} />
              <p>
                <strong>
                  Interested in doing a different campaign to get your gift
                  card?
                </strong>{' '}
                {SECONDARY_CAMPAIGN_PROMPT}
              </p>
            </div>
          ) : null}
          <div>
            <CampaignLink
              campaignId={`${SECONDARY_CAMPAIGN_ID}`}
              userId={userId}
            />
          </div>
          <h3>About Us</h3>
          DoSomething is the largest not-for-profit for young people and social
          change. Using our digital platform, millions of young people make
          real-world impact through our volunteer, social change, and civic
          action campaigns. We’ve got hundreds of campaigns to choose from (but
          only the two above are offering the gift card reward right now). Let’s
          do this!
        </div>
      </div>
    </div>
  );
};

ReferralPageContent.propTypes = {
  firstName: PropTypes.string.isRequired,
  primaryCampaignId: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

ReferralPageContent.defaultProps = {
  primaryCampaignId: null,
};

export default ReferralPageContent;
