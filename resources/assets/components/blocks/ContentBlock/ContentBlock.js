import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

import { Figure } from '../../Figure';
import SectionHeader from '../../SectionHeader';
import { contentfulImageUrl } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';

import './content-block.scss';

const ContentBlock = props => {
  const { content, image, imageAlignment, superTitle, title } = props;

  const contentNode = content ? <TextContent>{content}</TextContent> : null;

  return (
    <div className="content-block">
      {title ? (
        <div className="margin-horizontal-md">
          <SectionHeader preTitle={superTitle} title={title} />
        </div>
      ) : null}

      <div className="margin-horizontal-md">
        {image.url ? (
          <Figure
            image={contentfulImageUrl(image.url, '600', '600', 'fill')}
            alt={image.description || 'content-block'}
            alignment={`${imageAlignment}-collapse`}
            size="one-third"
          >
            {contentNode}
          </Figure>
        ) : (
          contentNode
        )}
      </div>
    </div>
  );
};

ContentBlock.propTypes = {
  content: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  imageAlignment: requiredIf(PropTypes.string, props => props.image.url),
  superTitle: PropTypes.string,
  title: PropTypes.string,
};

ContentBlock.defaultProps = {
  imageAlignment: null,
  superTitle: null,
  title: null,
};

export default ContentBlock;
