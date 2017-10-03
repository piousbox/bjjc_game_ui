
import { combineReducers } from 'redux'

import {
  DO_LOGOUT,

  SET_BADGE,

  SET_LOCATION,

  SET_PATH,
  SET_PROFILE,

  SET_SITE_NEWSITEMS,
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
  return state
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

function locationReducer (state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      /* fetch(TgmApi.location( action.locationname )).then(r => r.json()).then(_data => {
        console.log("+++ +++ locationReducer data is:", _data)
        return _data.location
      }) */
      return action.location
    default:
      return state
  }
}

function newsitemsReducer(state = {}, action) {
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

export default combineReducers({

  badge: badgeReducer,

  categories: categoriesReducer,
  category: categoryReducer,
 
  location: locationReducer,

  path: breadcrumbsReducer,
  profile: profileReducer,

  video: videoReducer,

  // trash
  cities: citiesIndexReducer,
  city: citiesShowReducer,
  gallery: galleriesShowReducer,
  newsitems: newsitemsReducer,
  report: reportsShowReducer,
  reports: reportsReducer,
  site: sitesReducer,
  venue: venuesShowReducer,

})
