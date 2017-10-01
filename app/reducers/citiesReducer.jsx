
/*
 * citiesReducer
 */

import {
  SET_CITIES_INDEX,
  SET_CITIES_SHOW,
  SET_CITY,

} from '../constants'

import AppDispatcher from '../dispatcher/AppDispatcher'
import config from 'config'

function citiesIndexReducer (state = {}, action) {
  switch (action.type) {
    case SET_CITIES_INDEX:
      return action.cities
    default:
      return state
  }
}

const citiesShowReducer = (state={}, action) => {
  switch (action.type) {
    case SET_CITY:
      return action.city
    default:
      return state
  }
}

export default {
  citiesIndexReducer,
  citiesShowReducer,
}
