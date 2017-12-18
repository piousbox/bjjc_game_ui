
/*
 * bjjc_react actions/index.js
 */

import {
  CONST,
  FBACCOUNT,
  SET,

  SET_CHAPTER,
  SET_CHAPTERS,
  
  SET_BADGE,
  SET_INDEX_CATEGORY,
  SET_PATH,
  SET_SHOW_CATEGORY,
  SET_STORY,
  SET_VIDEO,
} from '../constants';

import config from 'config'

const categoriesIndex = (cats) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/categories`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({ type: SET.categories, categories: _data.categories })
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
    fetch(url).then(r => r.json()).then(_data => {
      console.log('+++ +++ action setBadge', _data)
      dispatch({ type: SET.quest, quest: _data.quest })
      dispatch({ type: SET.videos, videos: _data.videos })
      dispatch({ type: SET.tasks, tasks: _data.tasks })
      // dispatch({ type: SET_BADGE, badge: _data })
    })
  }
}

const setBreadcrumbs = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_PATH, params: params })
  }
}

const setCategories = (cats) => {
  let url = `${config.apiUrl}/api/categories/${cats.join('/')}.json`
  return (dispatch, getState) => {
    fetch(url).then(r => r.json()).then(_data => {
      // console.log('+++ fetched categories:', _data)
      dispatch({ type: SET.categories, categories: _data.categories })
    })
  }
}

const setChapters = () => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/chapters.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({ type: SET_CHAPTERS, chapters: _data })
    })
  }
}

const setChapter = (name) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/chapters/${name}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({ type: SET_CHAPTER, chapter: _data })
    })
  }
}

// _vp_ 20171218
const locationAction = (name) => {
  return (dispatch, getState) => {
    let url       = `${config.apiUrl}/api/locations/${name}.json`
    let headers   = { version: 'tgm3' }
    let fbAccount = JSON.parse(localStorage.getItem(FBACCOUNT))
    if (fbAccount) {
      headers.accessToken = fbAccount.fb_long_access_token
    }
    fetch(url, { headers, }).then(r => r.json()).then(_data => {
      console.log('+++ _data 35 is:', _data)
      dispatch({ type: SET.location, location: _data.location })
    })
  }
}

// _vp_ 20171218
const questAction = (badgename) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/badges/view/${badgename}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({ type: SET.quest, quest: _data.badge })
    })
  }
}

// @TODO: trash, remove
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

// @TODO: trash, remove
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

import { loginAction, logoutAction, profileAction, } from './profileActions'

export default {
  categoriesIndex,
  categoriesShow,

  locationAction,
  loginAction,
  logoutAction,

  setCategories,
  setChapters,
  setChapter,
  setBadge,
  setPath: setBreadcrumbs,
  siteNewsitemsAction,
  siteShow,

  profileAction,

  questAction,

  videosShowAction,
}
