import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'
import { Provider }   from 'react-redux'

import Tgm3 from '../Tgm3'
import store from '../../../stores'

describe('Tgm3', () => {
  it('Should render anything', () => {
    let params = {}
    let router = {
      location: () => { return (null) }
    }
    let component = ReactTestUtils.renderIntoDocument(
      <Provider store={store} >
        <Tgm3 params={params} router={router} />
      </Provider>
    );
    let elem = ReactDOM.findDOMNode(component);
    expect(elem.tagName.toLowerCase()).to.equal('div');
  });
});
