import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'
import { spyOnComponentMethod, stubComponentMethod, } from 'sinon-spy-react'

import LocationMap from '../LocationMap'
import store from '../../../stores'

describe('LocationMap', () => {
  it('Doesnt render anything at first', () => {
    let home = ReactTestUtils.renderIntoDocument(<LocationMap store={store} params={{ locationname: 'text-location' }} />)
    let elem = ReactDOM.findDOMNode(home)
    expect(elem).to.equal(null)
    // expect(elem.tagName.toLowerCase()).to.equal('div');
  })

  it('dispatches locationAction', () => {
    const spy = spyOnComponentMethod(store, 'dispatch')
    let locationMap = ReactTestUtils.renderIntoDocument(<LocationMap store={store} params={{ locationname: 'text-location' }} />)
    let elem = ReactDOM.findDOMNode(locationMap)
    console.log('+++ herehere', store, spy.calledOnce)
    // expect(spy.calledOnce).to.equal(true)
    // expect(store.dispatch).toHaveBeenCalledWith('abba', 'oppa')
  })
})

