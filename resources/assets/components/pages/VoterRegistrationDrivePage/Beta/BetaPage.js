import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import { gqlVariables } from './config';
import ErrorPage from '../../ErrorPage';
import HeroSection from './HeroSection';
import { isDevEnvironment, query } from '../../../../helpers';
import NotFoundPage from '../../NotFoundPage';
import Modal from '../../../utilities/Modal/Modal';
import Placeholder from '../../../utilities/Placeholder';
import ButtonLink from '../../../utilities/ButtonLink/ButtonLink';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import StartVoterRegistrationForm from './StartVoterRegistrationForm';
import SiteNavigationContainer from '../../../SiteNavigation/SiteNavigationContainer';
import ScholarshipInfoBlock from '../../../blocks/ScholarshipInfoBlock/ScholarshipInfoBlock';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const BETA_VOTER_REGISTRATION_DRIVE_PAGE_QUERY = gql`
  query BetaVoterRegistrationDrivePageQuery(
    $referrerUserId: String!
    $voterRegistrationDriveCampaignWebsiteId: String!
  ) {
    user(id: $referrerUserId) {
      id
      firstName
    }

    campaignWebsite(id: $voterRegistrationDriveCampaignWebsiteId) {
      additionalContent
      campaignId
      coverImage {
        description
        url
      }
      scholarshipAmount
      scholarshipDeadline
      title
      url
    }
  }
`;

const BetaVoterRegistrationDrivePage = () => {
  const referrerUserId = query('referrer_user_id');

  const config = isDevEnvironment()
    ? gqlVariables.dev
    : gqlVariables.production;
  /**
   * The CampaignWebsite ID is the same across all Contentful environments for OVRD.
   * @see /docs/development/features/voter-registration
   */
  const voterRegistrationDriveCampaignWebsiteId = '3pwxnRZxociqMaQCMcGOyc';

  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const modalToggle = () => setShowScholarshipModal(true);

  if (!referrerUserId) {
    return <NotFoundPage />;
  }

  const { loading, error, data } = useQuery(
    BETA_VOTER_REGISTRATION_DRIVE_PAGE_QUERY,
    {
      variables: {
        referrerUserId,
        voterRegistrationDriveCampaignWebsiteId,
      },
    },
  );

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!data.user) {
    return <NotFoundPage id={referrerUserId} />;
  }

  const {
    additionalContent,
    campaignId,
    scholarshipAmount,
    scholarshipDeadline,
    url,
  } = data.campaignWebsite;

  return (
    <>
      <SiteNavigationContainer />
      <main data-test="beta-voter-registration-drive-page">
        <HeroSection
          user={data.user}
          campaignInfo={data.campaignWebsite}
          modalToggle={modalToggle}
        />
        <div className="bg-white">
          <div className="md:w-3/4 mx-auto py-6 px-3 pitch-landing-page">
            <ContentfulEntryLoader
              id={config.startVoterRegistration.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <div className="pb-6">
              <StartVoterRegistrationForm
                referrerUserId={referrerUserId}
                campaignId={campaignId}
              />
            </div>
            <ContentfulEntryLoader
              id={config.faq.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <ContentfulEntryLoader
              id={config.joinCampaign.contentBlockId}
              className="grid-wide clearfix wrapper pb-3"
            />
            <ButtonLink link={url}>Get Started</ButtonLink>
          </div>
        </div>
        {showScholarshipModal ? (
          <Modal
            className="-inverted -scholarship__info"
            onClose={() => {
              setShowScholarshipModal(false);
            }}
            trackingId="SCHOLARSHIP_MODAL_BETA_VOTER_REGISTRATION"
          >
            <ScholarshipInfoBlock
              campaignId={campaignId}
              scholarshipAmount={scholarshipAmount}
              scholarshipDeadline={scholarshipDeadline}
              numberOfScholarships={additionalContent.numberOfScholarships || 1}
            />
          </Modal>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
};

export default BetaVoterRegistrationDrivePage;
