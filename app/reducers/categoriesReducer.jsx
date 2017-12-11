
/*
 * categoriesReducer
 */

import {
  SET,
  SET_SHOW_CATEGORY,
  SET_INDEX_CATEGORY,
} from '../constants'

import AppDispatcher from '../dispatcher/AppDispatcher'
import config from 'config'

function categoryReducer (state = {}, action) {
  switch (action.type) {
    case SET_SHOW_CATEGORY:
      console.log('+++ +++ category reducer:', action)
      return action.category
    default: return state
  }
}

function categoriesReducer (state = {}, action) {
  switch (action.type) {
    case SET.categories:
      console.log('+++ +++ set index category reducer:', action)
      let newState = Object.assign({}, state)
      newState[action.path] = action
      newState.categories = action.categories
      return newState
    default:
      return state
  }
}

export default {
  categoryReducer,
  categoriesReducer,
}
