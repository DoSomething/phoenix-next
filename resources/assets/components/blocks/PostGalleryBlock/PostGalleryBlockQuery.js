import React from 'react';
import gql from 'graphql-tag';
import { split } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PaginatedQuery from '../../PaginatedQuery';
import ScrollConcierge from '../../ScrollConcierge';
import { query, withoutNulls } from '../../../helpers';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';
import SelectLocationDropdown from '../../utilities/SelectLocationDropdown/SelectLocationDropdown';

/**
 * The GraphQL query to load data for this component.
 */
const POST_GALLERY_QUERY = gql`
  query PostGalleryQuery(
    $actionIds: [Int]
    $location: String
    $count: Int
    $page: Int
  ) {
    posts(
      actionIds: $actionIds
      location: $location
      count: $count
      page: $page
    ) {
      ...PostCard
      ...ReactionButton
    }
  }

  ${postCardFragment}
  ${reactionButtonFragment}
`;

/**
 * Fetch results via GraphQL using a query component.
 */
class PostGalleryBlockQuery extends React.Component {
  constructor(props) {
    super(props);

    // FilterType specified on Contentful PostGallery entry.
    const filterType =
      this.props.filterType === 'none' ? null : this.props.filterType;

    let filterValue = '';
    let hasUrlOptions = false;
    let options = query(`options[${this.props.id}]`);

    options = options ? split(options, ':') : null;

    if (this.validQueryOptions(options, filterType)) {
      filterValue = options[1];
      hasUrlOptions = true;
    }

    this.state = {
      filterValue,
      filterType,
      hasUrlOptions,
      shouldScrollToFilter: false,
    };
  }

  /**
   * Validate the supplied URL options.
   *
   * @param  {Array} options
   * @param  {String} filterType
   * @return {Boolean}
   */
  validQueryOptions = (options, filterType) => {
    if (!options || options.length <= 1) {
      return false;
    }

    const validFilterType = options[0] === filterType;

    let validFilterValue = false;

    if (filterType === 'location') {
      const regex = new RegExp(`^US-[A-Z]{2}$`, 'g');

      validFilterValue = options[1].match(regex);
    }

    return Boolean(validFilterType && validFilterValue);
  };

  /**
   * Handle select dropdown filter changes.
   *
   * @param  {Object} event
   * @return {Void}
   */
  handleSelect = event => {
    this.setState({
      filterValue: event.target.value,
    });
  };

  /**
   * Callback for when PostGallery has rendered.
   *
   * @return {Void}
   */
  galleryReady = () => {
    if (this.state.hasUrlOptions && !this.state.shouldScrollToFilter) {
      this.setState({
        shouldScrollToFilter: true,
      });
    }
  };

  render() {
    const { actionIds, className, hideReactions, id, itemsPerRow } = this.props;

    return (
      <React.Fragment>
        {this.state.filterType === 'location' ? (
          <div className="grid-narrow margin-bottom-lg">
            {this.state.shouldScrollToFilter ? <ScrollConcierge /> : null}
            <SelectLocationDropdown
              locationList="domestic"
              onSelect={this.handleSelect}
              selectedOption={this.state.filterValue}
            />
          </div>
        ) : null}

        <PaginatedQuery
          query={POST_GALLERY_QUERY}
          queryName="posts"
          variables={withoutNulls({
            actionIds,
            location: this.state.filterValue || null,
          })}
          count={itemsPerRow * 3}
        >
          {({ result, fetching, fetchMore }) => (
            <PostGallery
              id={id}
              className={classnames(className)}
              hideReactions={hideReactions}
              itemsPerRow={itemsPerRow}
              loading={fetching}
              loadMorePosts={fetchMore}
              onRender={this.galleryReady}
              posts={result}
              shouldShowNoResults
              waypointName={'post_gallery_block'}
            />
          )}
        </PaginatedQuery>
      </React.Fragment>
    );
  }
}

PostGalleryBlockQuery.propTypes = {
  id: PropTypes.string,
  actionIds: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
  filterType: PropTypes.string,
  hideReactions: PropTypes.bool,
  itemsPerRow: PropTypes.number,
};

PostGalleryBlockQuery.defaultProps = {
  id: null,
  actionIds: [],
  className: null,
  filterType: null,
  hideReactions: false,
  itemsPerRow: 3,
};

// Export the GraphQL query component.
export default PostGalleryBlockQuery;
