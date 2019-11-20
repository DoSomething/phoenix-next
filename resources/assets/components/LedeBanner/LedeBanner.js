import React from 'react';
import PropTypes from 'prop-types';

import CoverTemplate from './templates/CoverTemplate';
import JumboTemplate from './templates/JumboTemplate';
import MosaicTemplate from './templates/MosaicTemplate';
import MarqueeTemplate from '../pages/LandingPage/templates/MarqueeTemplate';

const LedeBanner = props => {
  const { template, featureFlagUseLegacyTemplate } = props;

  switch (template) {
    case 'cover':
      return <CoverTemplate {...props} />;

    case 'jumbo':
      return <JumboTemplate {...props} />;

    default:
      return featureFlagUseLegacyTemplate ? (
        <MosaicTemplate {...props} />
      ) : (
        <MarqueeTemplate {...props} />
      );
  }
};

LedeBanner.propTypes = {
  featureFlagUseLegacyTemplate: PropTypes.bool,
  template: PropTypes.string.isRequired,
};

LedeBanner.defaultProps = {
  // @TODO: This should default to false once we're ready to ship the Hero Template!
  featureFlagUseLegacyTemplate: false,
};

export default LedeBanner;
