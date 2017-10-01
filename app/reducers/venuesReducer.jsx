
/*
 * venuesReducer
 */

import {
  SET_VENUE,
} from '../constants/AppConstants'

import AppDispatcher from '../dispatcher/AppDispatcher'
import config from 'config'

const venuesShowReducer = (state={}, action) => {
  switch (action.type) {
    case SET_VENUE:
      return action.venue
    default:
      return state
  }
}

export default {
  venuesShowReducer,
}
