import React from 'react';
import {shallow} from 'enzyme';

import Wiki from './wiki';

describe('<Wiki/>', () => {
  it('should init', () => {
    const wrapper = shallow(<Wiki></Wiki>);
    wrapper.should.be.defined;
  });

  it('should render just text', () => {
    const wrapper = shallow(<Wiki>foo bar</Wiki>);
    wrapper.html().should.contain('foo bar');
  });
});
