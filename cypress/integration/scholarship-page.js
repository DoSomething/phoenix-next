/// <reference types="Cypress" />

import exampleScholarshipPage from '../fixtures/contentful/exampleScholarshipPage';

describe('Pages', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visits site and sees cta', () => {
    cy.withState(exampleScholarshipPage).visit(
      '/us/facts/test-11-facts-about-testing',
    );
    cy.contains('PAYS TO DO GOOD');
  });
});
