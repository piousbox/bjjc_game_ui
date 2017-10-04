
import { combineReducers } from 'redux'

import {
  DO_LOGOUT,

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
import { videoReducer, } from './videosReducer'

import config from 'config'

// b
function badgeReducer (state={}, action) {
  switch (action.type) {
    case SET_BADGE:
      console.log('+++ +++ badgeReducer:', action)
      return action.badge
    default:
      return state
  }
}

function breadcrumbsReducer(state={}, action) {
  switch (action.type) {
    case SET_PATH:
      console.log('+++ +++ breadcrumbsReducer:', action)
      return Object.assign({}, action.params)
    default: 
      return state
  }
}

function leftPaneReducer (state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      console.log('+++ +++ leftPaneReducer:', action)
      return { location: action.location }
    default:
      return state
  }
}


function locationReducer (state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      console.log('+++ +++ locationReducer:', action)
      return action.location
    default:
      return state
  }
}

function newsitemsReducer (state = {}, action) {
  switch (action.type) {
    case SET_SITE_NEWSITEMS:
      return action.newsitems
    default:
      return state
  }
}

function profileReducer (state = {}, action) {
  switch (action.type) {
    case SET_PROFILE:
      return action.fbAccount
    default:
      return state
  }
}

function rightPaneReducer (state={}, action) {
  return state
}

function story (state={}, action) {
  switch (action.type) {
    case SET_STORY:
      return action.story
    default: 
      return state
  }
}

export default combineReducers({

  badge: badgeReducer,

  categories: categoriesReducer,
  category: categoryReducer,
 
  blocation: locationReducer,

  path: breadcrumbsReducer,
  profile: profileReducer,

  video: videoReducer,
  
  leftPane: leftPaneReducer,
  rightPane: rightPaneReducer,

  // trash
  cities: citiesIndexReducer,
  city: citiesShowReducer,
  gallery: galleriesShowReducer,
  newsitems: newsitemsReducer,
  report: reportsShowReducer,
  reports: reportsReducer,
  site: sitesReducer,
  story,
  venue: venuesShowReducer,

})
