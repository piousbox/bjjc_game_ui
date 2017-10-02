
/*
 * videosReducer
 */

import {
  SET_VIDEO,
} from '../constants'

import AppDispatcher from '../dispatcher/AppDispatcher'
import config from 'config'

function videoReducer (state = {}, action) {
  switch (action.type) {
    case SET_VIDEO:
      console.log('+++ +++ reducing video:', action)
      return action.video
    default: 
      return state
  }
}

export default {
  videoReducer,
}
