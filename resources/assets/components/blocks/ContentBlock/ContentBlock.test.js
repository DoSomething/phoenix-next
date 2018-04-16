import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ContentBlock from './ContentBlock';

const props = {
  superTitle: 'Test Super Title',
  title: 'Test Title',
  content: 'Test Content',
};

const image = { image: 'image.com' };

describe('ContentBlock component', () => {
  test('is rendered with the proper child components when image is set', () => {
    const wrapper = shallow(<ContentBlock {...props} {...image} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('Figure').length).toEqual(1);
    expect(wrapper.find('Markdown').length).toEqual(1);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test("does not include SectionHeader when there's no title", () => {
    const wrapper = shallow(
      <ContentBlock {...props} {...image} title={undefined} />,
    );

    expect(wrapper.find('SectionHeader').length).toEqual(0);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('is rendered with the proper child components when image is not set', () => {
    const wrapper = shallow(<ContentBlock {...props} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('Figure').length).toEqual(0);
    expect(wrapper.find('Markdown').length).toEqual(1);
  });

  test('it renders the correct alignment class for "left" and "right" image props', () => {
    let wrapper = shallow(
      <ContentBlock {...props} {...image} imageAlignment="left" />,
    );
    expect(wrapper.find('Figure').props().alignment).toEqual('left-collapse');

    wrapper = shallow(
      <ContentBlock {...props} {...image} imageAlignment="right" />,
    );
    expect(wrapper.find('Figure').props().alignment).toEqual('right-collapse');
  });

  test('it defaults to "right" image alignment', () => {
    const wrapper = shallow(<ContentBlock {...props} {...image} />);
    expect(wrapper.find('Figure').props().alignment).toEqual('right-collapse');
  });

  test('it works beautifully with a mere content prop', () => {
    const wrapper = shallow(<ContentBlock content="hi there" />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
