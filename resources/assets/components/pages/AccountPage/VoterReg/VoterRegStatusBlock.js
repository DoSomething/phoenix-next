import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import checkmark from './checkmark.svg';
import Spinner from '../../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';
import { getTrackingSource } from '../../../../helpers/voter-registration';

import './voter-reg.scss';

const USER_VOTER_REGISTRATION_STATUS_QUERY = gql`
  query userVoterRegistrationStatusQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

const VoterRegStatusBlock = ({ userId }) => {
  const options = { variables: { userId } };

  const { loading, error, data } = useQuery(
    USER_VOTER_REGISTRATION_STATUS_QUERY,
    options,
  );

  const registrationStatus = get(data, 'user.voterRegistrationStatus', null);

  if (loading) {
    return <Spinner className="flex justify-center p-16" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  if (registrationStatus === 'UNCERTAIN') {
    return (
      <div className="voter-reg flex items-center">
        <div className="m-3">
          Check your voter registration status{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://am-i-registered-to-vote.org/dosomething/"
          >
            here
          </a>
          .
        </div>
      </div>
    );
  }

  if (
    registrationStatus === 'CONFIRMED' ||
    registrationStatus === 'REGISTRATION_COMPLETE' ||
    registrationStatus === 'INELIGIBLE'
  ) {
    return (
      <div className="voter-reg -green flex items-center">
        <img
          className="pl-2 post-badge icon-check"
          src={checkmark}
          alt="hello"
        />
        <div className="m-3">Your voter registration is confirmed.</div>
      </div>
    );
  }

  return (
    <div className="voter-reg flex items-center">
      <div className="m-3">
        <p>We don&#39;t have your voter registration.</p>
        <a
          href={`https://vote.dosomething.org/?r=${getTrackingSource(
            'profile',
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base"
        >
          Register here
        </a>
      </div>
    </div>
  );
};

VoterRegStatusBlock.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default VoterRegStatusBlock;
