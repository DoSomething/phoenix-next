import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';

import ClubSelect from './ClubSelect';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Spinner from '../../artifacts/Spinner/Spinner';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import { getUserId, isAuthenticated, useGate } from '../../../helpers/auth';

const USER_CLUB_MUTATION = gql`
  mutation UserClubMutation($userId: String!, $clubId: Int) {
    updateClubId(id: $userId, clubId: $clubId) {
      id
    }

    updateEmailSubscriptionTopic(id: $userId, topic: CLUBS, subscribed: true) {
      id
    }
  }
`;

const CurrentClubForm = () => {
  const [flash, authenticate] = useGate('CurrentClubForm');
  const [clubId, setClubId] = useState();

  const [updateUserClub, { loading, data, error }] = useMutation(
    USER_CLUB_MUTATION,
    {
      variables: { userId: getUserId(), clubId: flash.clubId },
      refetchQueries: ['UserClubQuery'],
    },
  );

  useEffect(() => {
    // If the user has been successfully redirected from the authentication flow after selecting their
    // club anonymously, manually run the mutation to add them to the club.
    if (isAuthenticated() && flash.clubId) {
      updateUserClub();
    }
  }, []);

  if (error) {
    return <ErrorBlock error={error} />;
  }

  // If the mutation was successful, hide the form while the CurrentClubBlock
  // updates to display the user's current club.
  if (isAuthenticated() && (data || flash.clubId)) {
    return <Spinner className="flex justify-center p-6" />;
  }

  return (
    <div data-testid="current-club-form">
      <p className="pb-3">
        Join an existing DoSomething club. Don’t forget to double check with
        your leader that you’re selecting the right one!
      </p>

      <strong>Club Name</strong>

      <ClubSelect onChange={setClubId} />

      <PrimaryButton
        attributes={{
          'data-testid': 'current-club-form-submit',
        }}
        className="mt-3 text-lg w-full"
        onClick={() =>
          isAuthenticated()
            ? updateUserClub({
                variables: { clubId },
              })
            : authenticate({ clubId })
        }
        isLoading={loading}
        isDisabled={!clubId || loading}
        text="Join Now"
      />
    </div>
  );
};

export default CurrentClubForm;
