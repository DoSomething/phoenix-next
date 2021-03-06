import React from 'react';
import PropTypes from 'prop-types';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './cta-banner.scss';

const CtaBanner = ({ buttonText, content, link, title }) => {
  const handleClick = () =>
    trackAnalyticsEvent('clicked_call_to_action_banner', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'call_to_action_banner',
      context: {
        url: link,
      },
    });

  return (
    <div className="cta-banner base-12-grid py-3 md:py-6">
      <div className="grid-narrow m-3">
        <h3 className="text-m text-yellow-500 font-bold uppercase">{title}</h3>
        <p className="text-white mt-3">{content}</p>
        <a
          className="cta-banner__button button p-3 mt-3"
          href={link}
          onClick={handleClick}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

CtaBanner.propTypes = {
  buttonText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CtaBanner;
