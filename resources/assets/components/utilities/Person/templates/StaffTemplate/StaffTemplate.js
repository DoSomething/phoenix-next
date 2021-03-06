import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure/Figure';
import { contentfulImageUrl } from '../../../../../helpers/contentful';

const StaffTemplate = props => {
  const {
    showcaseTitle,
    showcaseDescription,
    showcaseImage,
    twitterId,
  } = props;

  return (
    <Figure
      alt={`picture of ${showcaseTitle}`}
      image={contentfulImageUrl(
        get(showcaseImage, 'url'),
        '400',
        '400',
        'fill',
      )}
    >
      <h4>
        {twitterId ? (
          <a
            href={`https://twitter.com/${twitterId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {showcaseTitle}
          </a>
        ) : (
          showcaseTitle
        )}
      </h4>
      <p>{showcaseDescription}</p>
    </Figure>
  );
};

StaffTemplate.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  twitterId: PropTypes.string,
};

StaffTemplate.defaultProps = {
  twitterId: null,
};

export default StaffTemplate;
