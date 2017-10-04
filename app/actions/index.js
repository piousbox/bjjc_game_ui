
/*
 * bjjc_react actions/index.js
 */

import {
  SET_BADGE,
  SET_INDEX_CATEGORY,
  SET_LOCATION,
  SET_PATH,
  SET_SHOW_CATEGORY,
  SET_STORY,
  SET_VIDEO,
} from '../constants';

import config from 'config'

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

const setBadge = (badgename) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/badges/${badgename}.json`
    // console.log('+++ +++ action setBadge', url)
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({ type: SET_BADGE, badge: _data })
    })
  }
}

const setBreadcrumbs = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_PATH, params: params })
  }
}

const setLocation = (name) => {
  console.log('+++ setLocation:', name)
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/locations/${name}.json`
    fetch(url, {
      headers: {
        version: 'tgm3',
      },
    }).then(r => r.json()).then(_data => {
      // map
      dispatch({ type: SET_LOCATION, location: _data.location })
      dispatch({ tyle: SET_STORY, story: _data.story })
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


import { loginAction, logoutAction, profileAction, } from './profileActions'

export default {
  setBadge,
  setLocation,
  siteNewsitemsAction,
  setPath: setBreadcrumbs,
  siteShow,

  categoriesIndex,
  categoriesShow,

  videosShowAction,

  loginAction,
  logoutAction,
  profileAction,
}
