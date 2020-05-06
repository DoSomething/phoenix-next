import React from 'react';
import PropTypes from 'prop-types';

import ButtonLink from '../ButtonLink/ButtonLink';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './cta-popover-button.scss';

const CtaPopoverButton = ({ buttonText, link }) => {
  const handleClick = () =>
    trackAnalyticsEvent('clicked_call_to_action_popover', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'call_to_action_popover',
      context: {
        url: link,
      },
    });
  return (
    <div>
      <ButtonLink
        className="cta-popover__button"
        link={link}
        onClick={handleClick}
      >
        {buttonText}
      </ButtonLink>
    </div>
  );
};

CtaPopoverButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CtaPopoverButton;
