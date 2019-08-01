import React from 'react';
import gql from 'graphql-tag';

import Query from '../../Query';
import { query } from '../../../helpers';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import ReferralPageContent from './ReferralPageContent';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

const ReferralPage = () => {
  const userId = query('user_id');
  if (!userId) {
    return <ErrorBlock />;
  }

  return (
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
      {data =>
        data.user && data.user.id ? (
          <ReferralPageContent
            firstName={data.user.firstName}
            primaryCampaignId={query('campaign_id')}
            userId={userId}
          />
        ) : (
          <ErrorBlock />
        )
      }
    </Query>
  );
};

export default ReferralPage;
