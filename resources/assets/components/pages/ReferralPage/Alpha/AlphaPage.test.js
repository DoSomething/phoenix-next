import React from 'react';
import { shallow } from 'enzyme';

import AlphaPage from './AlphaPage';
import * as helpers from '../../../../helpers';

describe('AlphaPage component', () => {
  test('is rendered as an ErrorPage if referral link is not generated', () => {
    helpers.getReferFriendsLink = jest.fn().mockReturnValue(undefined);

    const wrapper = shallow(<AlphaPage />);

    expect(wrapper.find('ErrorPage').length).toEqual(1);
  });

  test('is rendered with a main.alpha-referral-page if referral link is generated', () => {
    helpers.getReferFriendsLink = jest
      .fn()
      .mockReturnValue('http://refer.friends');

    const wrapper = shallow(<AlphaPage />);

    expect(wrapper.find('main.alpha-referral-page').length).toEqual(1);
  });
});
