import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Markdown from '../../Markdown';
import SignupButton from '../../SignupButton';
import SponsorPromotion from '../../SponsorPromotion';
import { contentfulImageUrl } from '../../../helpers';

import './cover-lede-banner.scss';

const CoverTemplate = (props) => {
  const {
    affiliatedActionLink,
    affiliatedActionText,
    affiliateSponsors,
    coverImage,
    isAffiliated,
    subtitle,
    title,
  } = props;

  const blurb = 'Want to celebrate Black History Month by supporting diversity in TV and film? Take 5 minutes and you\'ll enter to win a $3000 scholarship.';

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '1440', '810', 'fill')})`,
  };

  const actionButton = affiliatedActionLink ? (
    <div className="cover-lede-banner__signup">
      <Link className="button -action" to={affiliatedActionLink}>
        { affiliatedActionText || 'Take Action' }
      </Link>
    </div>
  ) : null;

  return (
    <header role="banner" className="cover-lede-banner" style={backgroundImageStyle}>
      <div className="wrapper margin-horizontal-auto">
        <h1 className="cover-lede-banner__headline-title">{title}</h1>

        <h2 className="cover-lede-banner__headline-subtitle">{subtitle}</h2>

        { blurb ? <Markdown className="cover-lede-banner__blurb">{blurb}</Markdown> : null }

        { isAffiliated ?
          actionButton :
          <div className="cover-lede-banner__signup">
            <SignupButton source="cover lede banner" />
          </div>
        }

        { affiliateSponsors.length ?
          <SponsorPromotion
            className="cover-lede-banner__sponsor"
            imgUrl={affiliateSponsors[0].fields.logo.url}
            title={affiliateSponsors[0].fields.logo.title}
          />
          :
          null
        }
      </div>
    </header>
  );
};

CoverTemplate.propTypes = {
  affiliatedActionLink: PropTypes.string,
  affiliatedActionText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

CoverTemplate.defaultProps = {
  affiliatedActionLink: null,
  affiliatedActionText: null,
  blurb: null,
};

export default CoverTemplate;
