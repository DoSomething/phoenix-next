import React from 'react';
import { shallow } from 'enzyme';

import LinkAction from './LinkAction';

describe('LinkAction component', () => {
  const props = {
    title: 'Click on this link!',
    link: 'https://dosomething.org',
  };

  const wrapper = shallow(<LinkAction {...props} />);

  it('renders the ClassicTemplate by default', () => {
    expect(wrapper.find('ClassicTemplate')).toHaveLength(1);
  });
});
