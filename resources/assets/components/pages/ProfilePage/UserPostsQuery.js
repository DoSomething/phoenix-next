import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';

const USER_POSTS_QUERY = gql`
  query UserPostsQuery($userId: String!, $count: Int, $page: Int) {
    postsByUserId(id: $userId, count: $count, page: $page) {
      id
      type
      status
      url
      text
      tags
      quantity
      user {
        firstName
      }
    }
  }

  ${postCardFragment}
  ${reactionButtonFragment}
`;

const UserPostsQuery = ({ userId }) => (
  <PaginatedQuery
    query={USER_POSTS_QUERY}
    queryName="postsByUserId"
    variables={{ userId }}
    count={3}
  >
    {({ result, fetching, fetchMore }) => (
      <PostGallery
        posts={result}
        loading={fetching}
        loadMorePosts={fetchMore}
      />
    )}
  </PaginatedQuery>
);

UserPostsQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPostsQuery;
