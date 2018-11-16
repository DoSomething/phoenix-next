import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Button from '../utilities/Button/Button';
import { setFormData } from '../../helpers/forms';

const SignupButton = props => {
  const {
    campaignActionText,
    className,
    clickedSignupAction,
    disableSignup,
    source,
    sourceActionText,
    template,
    text,
    trackEvent,
    trafficSource,
    campaignId,
    campaignContentfulId,
  } = props;

  // Decorate click handler for A/B tests & analytics.
  const onSignup = buttonText => {
    const formData = setFormData({}, { campaignContentfulId });

    clickedSignupAction(campaignId, { body: formData });

    trackEvent('signup', {
      template,
      legacyCampaignId: campaignId, // @TODO: confirm it's ok to send as campaignID and not legacyCampaignId
      source,
      sourceData: { text: buttonText },
    });
  };

  // Have signups been disabled for this campaign?
  if (disableSignup) {
    return null;
  }

  // If a user has a traffic source w/ an override, try it!
  const sourceOverride = get(sourceActionText, trafficSource);
  const buttonCopy = text || sourceOverride || campaignActionText;

  return (
    <Button className={className} onClick={() => onSignup(buttonCopy)}>
      {buttonCopy}
    </Button>
  );
};

SignupButton.propTypes = {
  campaignActionText: PropTypes.string,
  className: PropTypes.string,
  clickedSignupAction: PropTypes.func.isRequired,
  disableSignup: PropTypes.bool,
  campaignId: PropTypes.string.isRequired,
  campaignContentfulId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  sourceActionText: PropTypes.objectOf(PropTypes.string),
  template: PropTypes.string,
  text: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
  trafficSource: PropTypes.string,
};

SignupButton.defaultProps = {
  campaignActionText: 'Take Action',
  className: null,
  disableSignup: false,
  sourceActionText: null,
  template: null,
  text: null,
  trafficSource: null,
};

export default SignupButton;
