import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';

import { PETITION_SUBMISSION_BLOCK_QUERY } from './PetitionSubmissionAction'; // eslint-disable-line import/no-duplicates
import PetitionSubmissionAction from './PetitionSubmissionAction'; // eslint-disable-line import/no-duplicates
import IntersectionObserverMock from '../../../__mocks__/intersectionObserverMock';

global.IntersectionObserver = IntersectionObserverMock;

const mocks = [
  {
    request: {
      query: PETITION_SUBMISSION_BLOCK_QUERY,
      variables: {
        userId: '1',
        actionIds: [1],
      },
    },
    result: {
      data: {
        posts: {},
        user: {},
      },
    },
  },
];

describe('PetitionSubmissionAction component', () => {
  const getWrapper = async () =>
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PetitionSubmissionAction
          automatedTest
          id="abcdefghi123456789"
          pageId="abcdefghi123456789"
          campaignContentfulId="1"
          content="Test Petition"
          submissions={{
            isPending: false,
            items: {},
          }}
          userId="666655554444333322221111"
          actionId={1}
          resetPostSubmissionItem={jest.fn()}
          storePost={jest.fn()}
        />
      </MockedProvider>,
    );

  test('is rendered as a card component with a form, textarea, submit button, and addtional info card', async () => {
    let wrapper;

    await act(async () => (wrapper = await getWrapper()));

    expect(wrapper.find('Card').length).toEqual(2);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('PrimaryButton').length).toEqual(1);
  });
});
