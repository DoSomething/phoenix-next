import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import {
  CAMPAIGN_SIGNUP_QUERY,
  getCampaignSignupQueryVariables,
} from '../../../helpers/campaign';
import QueryOptions from './QueryOptions';
import { PHOENIX_URL } from '../../../constants';
import { appendToQuery } from '../../../helpers';
import { getUserId } from '../../../helpers/auth';
import Card from '../../utilities/Card/Card';
import Placeholder from '../../utilities/Placeholder';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PreviewImage from './voter-registration-drive-page.png';
import ShortLinkShareContainer from '../../utilities/ShortLinkShare/ShortLinkShareContainer';

export const VoterRegistrationDriveBlockFragment = gql`
  fragment VoterRegistrationDriveBlockFragment on VoterRegistrationDriveBlock {
    description
    title
  }
`;

const VoterRegistrationDriveAction = ({ description, title }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const { loading, error, data } = useQuery(CAMPAIGN_SIGNUP_QUERY, {
    variables: getCampaignSignupQueryVariables(),
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const signup = data.signups[0];
  const queryParams = { referrer_user_id: getUserId() };

  if (signup.group) {
    queryParams.group_id = signup.group.id;
  }

  return (
    <div className="clearfix pb-6">
      <Card className="rounded bordered" title={title}>
        <div className="lg:flex">
          <div className="lg:w-2/3">
            {description ? (
              <div className="p-3">
                <p>{description}</p>
              </div>
            ) : null}

            <ShortLinkShareContainer
              link={
                appendToQuery(
                  queryParams,
                  `${PHOENIX_URL}/us/my-voter-registration-drive`,
                ).href
              }
              onChange={url => setPreviewUrl(url)}
              queryOptions={<QueryOptions />}
            />
          </div>

          <div className="lg:w-1/3">
            <a href={previewUrl}>
              <img src={PreviewImage} alt="Preview of custom website" />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

VoterRegistrationDriveAction.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

VoterRegistrationDriveAction.defaultProps = {
  description: null,
  title: null,
};

export default VoterRegistrationDriveAction;
