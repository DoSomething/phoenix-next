/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';
import { campaignId } from '../fixtures/constants';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

describe('Site Wide Banner', () => {
  beforeEach(() => {
    cy.configureMocks();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ContentBlock',
        superTitle: faker.lorem.words(),
        title: faker.company.bsBuzz(),
        subTitle: faker.lorem.words(),
        content: faker.lorem.sentence(),
      },
    });
  });

  it('The Site Wide Banner is displayed for anonymous users', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: {
        groupTypeId: null,
      },
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('sitewide-banner').should('have.length', 1);
  });

  it('The Site Wide Banner is not displayed on the beta voter registration (OVRD) drive page', () => {
    const user = userFactory();

    // Mock response for the campaignWebsite query within our BetaVoterRegistrationDrivePageQuery.
    const campaignWebsite = {
      campaignId: faker.random.number(),
      title: faker.company.catchPhraseDescriptor(),
      coverImage: {
        url: faker.image.imageUrl(),
        description: faker.company.catchPhraseDescriptor(),
      },
      scholarshipAmount: '1500',
      scholarshipDeadline: '2022-04-25T00:00-08:00',
      additionalContent: null,
      url: faker.image.imageUrl(),
    };

    cy.mockGraphqlOp('BetaVoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(`/us/my-voter-registration-drive?referrer_user_id=${user.id}`);

    cy.findByTestId('sitewide-banner-hidden').should('have.length', 1);
  });

  /** @test */
  it('The Site Wide Banner is not displayed on voter registration quiz results page', () => {
    const quizResultId = 'p7hqjSP4Y1U6ad0UDz4iS';

    const linkBlock = {
      id: quizResultId,
      __typename: 'LinkBlock',
      title: faker.company.bsBuzz(),
      content: faker.lorem.sentence(),
    };

    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    cy.visit(`/us/quiz-results/${quizResultId}`);

    cy.findByTestId('sitewide-banner-hidden').should('have.length', 1);
  });

  /** @test */
  it('The Site Wide Banner is not displayed on groups campaign pages', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSitewideBannerQuery', {
      campaign: {
        id: campaignId,
        groupTypeId: 1,
      },
    });

    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);
    cy.findByTestId('sitewide-banner-hidden').should('have.length', 1);
  });

  /** @test */
  it('The Site Wide Banner CTA URL is correct for an unauthenticated user', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: {
        groupTypeId: null,
      },
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('sitewide-banner-button').should('have.length', 1);
    cy.findByTestId('sitewide-banner-button').should(
      'have.attr',
      'href',
      '/us/about/volunteer-hours',
    );
  });
});
