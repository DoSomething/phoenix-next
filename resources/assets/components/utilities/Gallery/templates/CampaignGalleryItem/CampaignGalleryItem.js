import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../../Figure';
import { contentfulImageUrl } from '../../../../../helpers';

const CampaignGalleryItem = ({ title, tagline, coverImage, slug }) => (
  <a
    className="campaign-gallery-item display-block"
    href={`/us/campaigns/${slug}`}
  >
    <Figure
      alt={`${coverImage.description || title}-photo`}
      image={contentfulImageUrl(coverImage.url, '400', '400', 'fill')}
    >
      <span className="font-bold">{title}</span>
      <br />
      {tagline ? <p className="font-normal">{tagline}</p> : null}
    </Figure>
  </a>
);

CampaignGalleryItem.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  slug: PropTypes.string.isRequired,
};

export default CampaignGalleryItem;
