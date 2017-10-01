import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'
import { mount, shallow } from 'enzyme'

import { Provider, connect } from 'react-redux'
import store from '../../../stores'

import CitiesIndex from '../CitiesIndex.jsx'

describe('CitiesIndex', () => {
  it('Should render the correct element', () => {
    let app1 = ReactTestUtils.renderIntoDocument(<Provider store={store}><CitiesIndex /></Provider>)
    let elem = ReactDOM.findDOMNode(app1)
    expect(elem.tagName.toLowerCase()).to.equal('div')
  })

  it('filters cities', () => {
    let cities = [ { name: 'abba' }, { name: 'boring' } ]
    let event = { target: { value: 'a' } }
    let wrapper = shallow(<CitiesIndex store={store} cities={cities} aaa={"bbb bbb"} />).shallow()
    wrapper.setProps({ cities: cities })
    let funcToTest = wrapper.instance().handleCitiesFilterChange
    funcToTest(event)
    let result = wrapper.instance().state.cities
    expect(result).to.eql([cities[0]]) // only abba b/c only it includes letter 'a'
  })

})
