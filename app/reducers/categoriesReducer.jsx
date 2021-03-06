
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
    case SET.category:
      console.log('+++ +++ category reducer:', action)
      return action.category
    default: 
      return state
  }
}

function categoriesReducer (state = [], action) {
  switch (action.type) {
    case SET.categories:
      console.log('+++ +++ categories reducer:', action)
      return action.categories
    default:
      return state
  }
}

export default {
  categoryReducer,
  categoriesReducer,
}
