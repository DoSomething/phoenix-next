import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../../Figure';
import { contentfulImageUrl } from '../../../../../helpers';

import './campaign-gallery-item.scss';

const CampaignGalleryItem = ({ title, tagline, coverImage, slug }) => (
  <a className="page-gallery-item display-block" href={`/us/campaigns/${slug}`}>
    <Figure
      alt={`${coverImage.description || title}-photo`}
      image={contentfulImageUrl(coverImage.url, '400', '400', 'fill')}
    >
      <h3>{title}</h3>

      {tagline ? <p className="description">{tagline}</p> : null}
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
