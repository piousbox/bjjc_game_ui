
/*
 * bjjc_react appActions.js
 */

import AppDispatcher from '../dispatcher/AppDispatcher'

import {
  SET_API_URL,
  SET_INDEX_CATEGORY,
  SET_LOCATION,
  SET_SHOW_CATEGORY,
  SET_VIDEO,
} from '../constants';

import config from 'config'

const setApiUrl = () => {
  return {
    type: SET_API_URL,
    apiUrl: config.apiUrl,
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


/* const citiesIndex = () => {
  return (dispatch, getState) => { 
    let state = getState()
    let url = config.apiUrl + "/api/cities.json"
    
    if (state.citiesIndex.length > 0) {
      dispatch({
        type: SET_CITIES_INDEX,
        cities: state.citiesIndex
      })
    } else {
      fetch(url).then(r => r.json()).then(_data => {

        console.log('+++ +++ _data is:', _data)

        dispatch({
          type: SET_CITIES_INDEX,
          cities: _data,
        })
      })
    }
  }
}

const citiesShow = (args) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/cities/view/${args.cityname}.json`
    fetch(url).then(r => r.json()).then(_data => {
      console.log("+++ +++ citiesShow() data:", _data)
      dispatch({
        type: SET_CITY,
        cityname: args.cityname,
        city: _data.city,
        galleries: _data.galleries,
      })
    })
  }
}

const galleriesShow = (args) => {
  console.log("+++ +++ start action galleriesShow:", args)

  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/galleries/view/${args.galleryname}.json`
    fetch(url).then(r => r.json()).then(_data => {
      console.log("+++ +++ galleriesShow() data:", _data)
      dispatch({
        type: SET_GALLERY,
        galleryname: args.galleryname,
        gallery: _data.gallery,
      })
    })
  }
}

const reportsShow = (args) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/reports/view/${args.reportname}.json`
    fetch(url).then(r => r.json()).then(_data => {
      console.log("+++ +++ reportsShow data:", _data)
      dispatch({
        type: SET_REPORT,
        report: _data.report,
      })
    })
  }
} */


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
  setApiUrl,
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
