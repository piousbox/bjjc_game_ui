
/*
 * bjjc_react actions/index.js
 */

import {
  SET_BADGE,
  SET_BREADCRUMBS,
  SET_INDEX_CATEGORY,
  SET_LOCATION,
  SET_SHOW_CATEGORY,
  SET_VIDEO,
} from '../constants';

import config from 'config'

const setBadge = (params) => {
  // console.log('+++ +++ setBadge:', params)
  // params.locationname, params.badgename

  return (dispatch, getState) => {
    dispatch({ type: SET_BADGE, badge: null })
  }
}

const setBreadcrumbs = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_BREADCRUMBS, params: null })
  }
}

const categoriesIndex = (params) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/categories`
    if (params.slug_0) {
      url = `${url}/${params.slug_0}`
      if (params.slug_1) {
        url = `${url}/${params.slug_1}`
        if (params.slug_2) {
          url = `${url}/${params.slug_2}`
          if (params.slug_3) {
            url = `${url}/${params.slug_3}`
            if (params.slug_4) {
              url = `${url}/${params.slug_4}`
              if (params.slug_5) {
                url = `${url}/${params.slug_5}`
                if (params.slug_6) {
                  url = `${url}/${params.slug_6}`
                }
              }
            }
          }
        }
      }
    }
    fetch(url).then(r => r.json()).then(_data => {
      let obj = Object.assign({}, _data, { type: SET_INDEX_CATEGORY })
      dispatch(obj)
    })
  }
}

const videosShowAction = (youtubeId) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/videos/view/${youtubeId}`
    fetch(url).then(r => r.json()).then(_data => {
      console.log("+++ +++ got video data:", _data)
      let obj = Object.assign({}, _data, { type: SET_VIDEO })
      dispatch(obj)
    })
  }
}

const categoriesShow = (variables) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/categories.json`    
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_CATEGORIES_INDEX,
        categories: _data,
      })
    })
  }
}

const siteNewsitemsAction = (args = {}) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/sites/view/${config.domain}/newsitems/${args.page}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_SITE_NEWSITEMS,
        newsitems: _data.newsitems,
      })
    })
  }
}

const siteShow = () => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/sites/view/${config.domain}.json`
    
    if (Object.keys(state.site).length > 0) {
      // ;
    } else {
      fetch(url).then(r => r.json()).then(_data => {
        dispatch({
          type: SET_SITE,
          site: _data.site,
        })
      })
    }
  }
}

const setLocation = (name) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/locations/${name}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({ type: SET_LOCATION, location: _data })
    })
  }
}


import { loginAction, logoutAction, profileAction, } from './profileActions'

export default {
  setBadge,
  setBreadcrumbs,
  setLocation,
  siteNewsitemsAction,
  siteShow,

  categoriesIndex,
  categoriesShow,

  videosShowAction,

  loginAction,
  logoutAction,
  profileAction,
}
