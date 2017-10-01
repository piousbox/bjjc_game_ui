import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'

import Home from '../Home.jsx'
import store from '../../../stores'

describe('Home', () => {
  it('Should render the correct element', () => {
    let home = ReactTestUtils.renderIntoDocument(
      <Home store={store} />
    );
    let elem = ReactDOM.findDOMNode(home);
    expect(elem.tagName.toLowerCase()).to.equal('div');
  });
});
