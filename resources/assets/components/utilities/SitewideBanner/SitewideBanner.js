import { get } from 'lodash';
import gql from 'graphql-tag';
import { createPortal } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { useRef, useEffect } from 'react';

import { getUserId } from '../../../helpers/auth';
import { getCampaign } from '../../../helpers/campaign';
import SitewideBannerContent from './SitewideBannerContent';
import { excludedPaths, excludedVoterRegistrationStatuses } from './config';

const USER_QUERY = gql`
  query UserSitewideBannerQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

const CAMPAIGN_QUERY = gql`
  query CampaignSitewideBannerQuery($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      groupTypeId
    }
  }
`;

/**
 * Checks if given pathname matches an entry in the excluded paths config.
 *
 * @param {String} pathname
 * @return {Boolean}
 */
const isExcludedPath = pathname => {
  return excludedPaths.find(excludedPath => {
    if (excludedPath.includes('*')) {
      const pathWithoutAsterisk = excludedPath.slice(0, -1);

      return (
        pathname.includes(pathWithoutAsterisk) &&
        pathname.length > pathWithoutAsterisk.length
      );
    }

    return excludedPath === pathname;
  });
};

/**
 * Checks if given voter registration status matches an entry in excluded status config.
 *
 * @param {String} voterRegistrationStatus
 * @return {Boolean}
 */
const isExcludedVoterRegistrationStatus = voterRegistrationStatus => {
  return excludedVoterRegistrationStatuses.includes[voterRegistrationStatus];
};

const SitewideBanner = props => {
  const usePortal = id => {
    const rootElem = useRef(document.createElement('div'));

    rootElem.current.classList.add('wrapper');

    useEffect(() => {
      const mainContainer = document.getElementById(id);

      mainContainer.prepend(rootElem.current);
    }, []);

    return rootElem.current;
  };

  const target = usePortal('banner-portal');
  const hiddenAttributeDataTestId = 'sitewide-banner-hidden';

  // First check if this path is excluded, to avoid making unnecessary GraphQL requests.
  if (isExcludedPath(window.location.pathname)) {
    target.setAttribute('data-testid', hiddenAttributeDataTestId);

    return null;
  }

  const userId = getUserId();
  const { data: userData, loading: userLoading } = useQuery(USER_QUERY, {
    variables: { userId },
    skip: !userId,
  });

  const campaign = getCampaign();
  const campaignId = campaign ? Number(campaign.campaignId) : null;
  const { data: campaignData, loading: campaignLoading } = useQuery(
    CAMPAIGN_QUERY,
    {
      variables: {
        campaignId,
      },
      skip: !campaignId,
    },
  );

  if (userLoading || campaignLoading) {
    return null;
  }

  if (
    /**
     * If this is a groups campaign, we hide the banner to avoid interfering with the group finder
     * on small screen.
     */
    !!get(campaignData, 'campaign.groupTypeId') ||
    isExcludedVoterRegistrationStatus(
      get(userData, 'user.voterRegistrationStatus'),
    )
  ) {
    target.setAttribute('data-testid', hiddenAttributeDataTestId);

    return null;
  }

  return createPortal(<SitewideBannerContent {...props} />, target);
};

export default SitewideBanner;
