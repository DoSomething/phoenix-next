import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import checkmark from './checkmark.svg';
import {
  getTrackingSource,
  getCheckRegistrationStatusURL,
  USER_VOTER_REGISTRATION_STATUS_QUERY,
} from '../../../../helpers/voter-registration';
import Spinner from '../../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';

import './voter-reg.scss';

const VoterRegStatusBlock = ({ userId }) => {
  const { loading, error, data } = useQuery(
    USER_VOTER_REGISTRATION_STATUS_QUERY,
    { variables: { userId } },
  );

  const registrationStatus = get(data, 'user.voterRegistrationStatus', null);

  if (loading) {
    return <Spinner className="flex justify-center p-16" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  if (
    registrationStatus === 'UNCERTAIN' ||
    registrationStatus === 'CONFIRMED'
  ) {
    return (
      <div className="voter-reg flex items-center">
        <div className="m-3">
          Check your voter registration status{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={getCheckRegistrationStatusURL()}
          >
            here
          </a>
          .
        </div>
      </div>
    );
  }

  if (
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
