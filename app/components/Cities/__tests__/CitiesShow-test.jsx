import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'
import { mount, shallow } from 'enzyme'

import { Provider, connect } from 'react-redux'
import store from '../../../stores'

import CitiesShow from '../CitiesShow.jsx'

describe('CitiesShow', () => {
  it('Should render the correct element', () => {
    let app1 = ReactTestUtils.renderIntoDocument(<Provider store={store}><CitiesShow params={{ cityname: 'xxTestCitynamexx' }} /></Provider>)
    let elem = ReactDOM.findDOMNode(app1)
    expect(elem.tagName.toLowerCase()).to.equal('div')
  })
})
