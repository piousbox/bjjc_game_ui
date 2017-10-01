
/*
 * sitesReducer
 */

import {
  SET_SITE,

} from '../constants/AppConstants'

import AppDispatcher from '../dispatcher/AppDispatcher'
import config from 'config'

function sitesReducer (state = {}, action) {
  switch (action.type) {
    case SET_SITE:
      console.log('+++ +++ SET_SITE:', action)

      return action.site
    default:
      return state
  }
}

export default {
  sitesReducer,
}
