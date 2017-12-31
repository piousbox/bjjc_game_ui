
/**
 * index reducer
 */

import { combineReducers } from 'redux'

import {
  DO_LOGOUT,

  SET,
  SET_CHAPTER,
  SET_CHAPTERS,

  SET_BADGE,

  SET_LOCATION,

  SET_PATH,
  SET_PROFILE,

  SET_SITE_NEWSITEMS,
  SET_STORY,

} from '../constants'

import { citiesIndexReducer, citiesShowReducer } from './citiesReducer'
import { galleriesShowReducer } from './galleriesReducer'
import { reportsShowReducer, reportsReducer } from './reportsReducer'
import { sitesReducer } from './sitesReducer'
import { venuesShowReducer } from './venuesReducer'
import { categoriesReducer, categoryReducer } from './categoriesReducer'

import config from 'config'

// b
function badgeReducer (state={}, action) {
  switch (action.type) {
    case SET_BADGE:
      // console.log('+++ +++ badgeReducer:', action)
      return action.badge
    default:
      return state
  }
}

function breadcrumbsReducer(state={}, action) {
  switch (action.type) {
    case SET_PATH:
      // console.log('+++ +++ breadcrumbsReducer:', action)
      return Object.assign({}, action.params)
    default: 
      return state
  }
}

// c
function chapter (state={}, action) {
  switch (action.type) {
    case SET_CHAPTER:
      return action.chapter
    default:
      return state
  }
}

function chapters (state=[], action) {
  switch (action.type) {
    case SET_CHAPTERS:
      return action.chapters
    default:
      return state
  }
}

// i
function inlineCategories (state=[], action) {
  switch (action.type) {
    case SET.inlineCategories:
      console.log('+++ +++ inlineCategories reducer?', action)
      return action.categories
    default:
      return state
  }
}
function inlinedCategory (state={}, action) {
  switch (action.type) {
    case SET.inlinedCategory:
      return action.category
    default:
      return state
  }
}

// l
function leftPaneReducer (state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      return { location: action.location }
    default:
      return state
  }
}

function location (state = {}, action) {
  switch (action.type) {
    case SET.location:
      console.log('+++ locationReducer:', action)
      return action.location
    default:
      return state
  }
}


// n
function newsitemsReducer (state = {}, action) {
  switch (action.type) {
    case SET_SITE_NEWSITEMS:
      return action.newsitems
    default:
      return state
  }
}

// p
function profileReducer (state = {}, action) {
  switch (action.type) {
    case SET_PROFILE:
      return action.fbAccount
    default:
      return state
  }
}

// q
function quest (state={}, action) {
  switch (action.type) {
    case SET.quest:
      // console.log('+++ quest reducer:', action)
      return action.quest
    default:
      return state
  }
}

// r
function rightPaneReducer (state={}, action) {
  return state
}

// s
function story (state={}, action) {
  switch (action.type) {
    case SET_STORY:
      return action.story
    default: 
      return state
  }
}

// t
function tasks (state=[], action) {
  switch (action.type) {
    case SET.tasks:
      // console.log('+++ tasks reducer:', action)
      return action.tasks
    default:
      return state
  }
}

// v
function video (state={}, action) {
  switch (action.type) {
    case SET.video:
      return action
    default:
      return state
  }
}
function videos (state=[], action) {
  switch (action.type) {
    case SET.videos:
      console.log('+++ videos reducer:', action)
      return action.videos
    default:
      return state
  }
}

export default combineReducers({

  badge: badgeReducer,

  categories: categoriesReducer,
  category: categoryReducer,
  chapter,
  chapters,

  inlineCategories,
  inlinedCategory,
  
  leftPane: leftPaneReducer,
  location,

  path: breadcrumbsReducer,
  profile: profileReducer,

  quest,

  rightPane: rightPaneReducer,

  tasks,

  video,
  videos,

})
