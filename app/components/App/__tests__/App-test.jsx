import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'

import App from '../App.jsx'
import store from '../../../stores'

describe('App', () => {
  it('Should render the correct element', () => {
    let app1 = ReactTestUtils.renderIntoDocument(
      <App store={store} />
    );
    let elem = ReactDOM.findDOMNode(app1);
    // expect(elem.tagName.toLowerCase()).to.equal('div'); // @TODO: check something here.
  });
});
