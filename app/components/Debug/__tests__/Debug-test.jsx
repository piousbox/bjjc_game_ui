import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'

import Debug from '../index.jsx'

describe('Debug', () => {
  it('Should render the correct element', () => {
    let app1 = ReactTestUtils.renderIntoDocument(
      <Debug />
    );
    let elem = ReactDOM.findDOMNode(app1);
    expect(elem.tagName.toLowerCase()).to.equal('div');
  });
});
