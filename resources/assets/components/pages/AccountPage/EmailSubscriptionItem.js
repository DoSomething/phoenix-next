import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const EMAIL_SUBSCRIPTION_QUERY = gql`
  query EmailSubscriptionsQuery($userId: String!) {
    user(id: $userId) {
      id
      emailSubscriptionTopics
    }
  }
`;

const EMAIL_SUBSCRIPTION_MUTATION = gql`
  mutation EmailSubscriptionTopic(
    $userId: String!
    $topic: EmailSubscriptionTopic!
    $subscribed: Boolean!
  ) {
    updateEmailSubscriptionTopic(
      id: $userId
      topic: $topic
      subscribed: $subscribed
    ) {
      id
      emailSubscriptionTopics
    }
  }
`;
const EmailSubscriptionItem = ({ identifier, name, image, description }) => {
  const options = { variables: { userId: window.AUTH.id } };

  // Make the initial query to get the user's subscriptions
  const { data, loading, error } = useQuery(EMAIL_SUBSCRIPTION_QUERY, options);
  const [updateSubscription] = useMutation(
    EMAIL_SUBSCRIPTION_MUTATION,
    options,
  );

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return <div className="spinner" />;
  }

  const topics = data.user.emailSubscriptionTopics;

  return (
    <div className="card rounded border-solid border-2 border-gray-300">
      <div className="flex flex-col h-full">
        <img
          className="pb-4"
          style={{ width: '100%' }}
          src={image}
          alt="newsletter"
        />
        <h3 className="text-base px-4">{name}</h3>
        <p className="pb-4 px-4 flex-grow">{description}</p>
        <button
          type="button"
          className={
            !topics.includes(identifier)
              ? 'btn mx-4 mb-4 bg-blurple-500 text-white border border-solid border-blurple-500 hover:bg-blurple-300'
              : 'btn mx-4 mb-4 bg-white border border-solid border-blurple-500 text-blurple-500 hover:border-blurple-300 hover:text-blurple-200'
          }
          onClick={() =>
            updateSubscription({
              variables: {
                topic: identifier,
                subscribed: !topics.includes(identifier),
              },
            })
          }
        >
          {topics.includes(identifier) ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

EmailSubscriptionItem.propTypes = {
  identifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EmailSubscriptionItem;
