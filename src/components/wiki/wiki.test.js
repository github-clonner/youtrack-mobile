import React from 'react';
import {shallow} from 'enzyme';

import Wiki from './wiki';

describe('<Wiki/>', () => {
  it('should init', () => {
    const wrapper = shallow(<Wiki></Wiki>);
    wrapper.should.be.defined;
  });
});
