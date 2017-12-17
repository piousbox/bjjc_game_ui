import React          from 'react';
import ReactDOM       from 'react-dom'
import { expect }     from 'chai'
import ReactTestUtils from 'react-dom/test-utils'

import store from '../../../stores'
import config from 'config'

import LocationMap from '../LocationMap'

const _locationname = 'test-location-65'
const oldFetch = fetch

describe('LocationMap', () => {
  it('Doesnt render anything at first', () => {
    let home = ReactTestUtils.renderIntoDocument(<LocationMap store={store} params={{ locationname: _locationname }} />)
    let elem = ReactDOM.findDOMNode(home)
    expect(elem).to.equal(null)
    // expect(elem.tagName.toLowerCase()).to.equal('div');
  })

  it('dispatches locationAction', () => {
    fetch = (url) => {

      expect(url).to.equal(`${config.apiUrl}/api/locations/${_locationname}.json`)
      return new Promise((resolve, reject) => {
        resolve()
      })
    }

    let locationMap = ReactTestUtils.renderIntoDocument(<LocationMap store={store} params={{ locationname: _locationname }} />)
    let elem = ReactDOM.findDOMNode(locationMap)

    fetch = oldFetch
  })
})

