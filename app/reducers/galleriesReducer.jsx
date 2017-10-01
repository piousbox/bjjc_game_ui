
/*
 * galleriesReducer
 */

import {
  SET_GALLERY,
} from '../constants'

import AppDispatcher from '../dispatcher/AppDispatcher'
import config from 'config'

const galleriesShowReducer = (state={}, action) => {
  switch (action.type) {
    case SET_GALLERY:
      return action.gallery
    default:
      return state
  }
}

export default {
  galleriesShowReducer,
}
