
/*
 * tgm_react (of bjjc) appActions.js
 */

// import ReduxThunk from 'redux-thunk'

import AppDispatcher from '../dispatcher/AppDispatcher'

import {
  DO_LOGOUT,

  ITEMS_GET_SUCCESS,
  ITEMS_GET_ERROR,

  SET_API_URL,

  SET_CITIES_INDEX,
  SET_CITIES_SHOW,
  SET_CITY,

  SET_GALLERY,
  SET_GALLERIES,

  SET_LOCATION,

  SET_MY_GALLERIES,
  SET_MY_REPORTS,

  SET_PROFILE,

  SET_REPORT,
  SET_REPORTS,

  SET_SITE,
  SET_SITE_NEWSITEMS,

  SET_TGM2_HOME,

  SET_VENUE,

} from '../constants/AppConstants';

import config from 'config'

import TgmApi from '../components/App/TgmApi'

const setApiUrl = () => {
  return {
    type: SET_API_URL,
    apiUrl: config.apiUrl,
  }
}

const setLocation = (locationName) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/locations/${locationName}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_LOCATION,
        location: _data,
      })
    })
  }
}

const profileAction = () => {
  return (dispatch, getState) => {
    if (localStorage.getItem('fbAccount')) {
      let fbAccount = JSON.parse(localStorage.getItem('fbAccount'))
      fetch(TgmApi.profile, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: localStorage.getItem('fbAccount'),
      }).then(r => r.json()).then(_data => {
        fbAccount = Object.assign({}, fbAccount, _data)
        dispatch({ type: SET_PROFILE, fbAccount: fbAccount })
      })
    }
    dispatch({ type: SET_PROFILE, fbAccount: null })
  }
}

const loginAction = (r2) => {
  return (dispatch, getState) => {
    localStorage.setItem('fbAccount', JSON.stringify(r2))
    dispatch(profileAction())
  }
}

const logoutAction = () => {
  localStorage.removeItem('fbAccount')
  return({ type: SET_PROFILE, fbAccount: null }) 
}

const citiesIndex = () => {
  return (dispatch, getState) => { 
    let state = getState()
    let url = config.apiUrl + "/api/cities.json"
    
    if (state.cities.length > 0) {
      dispatch({
        type: SET_CITIES_INDEX,
        cities: state.cities
      })
    } else {
      fetch(url).then(r => r.json()).then(_data => {
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
      dispatch({
        type: SET_CITY,
        cityname: args.cityname,
        city: _data.city,
        galleries: _data.galleries,
      })
    })
  }
}

const galleriesIndex = (args) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/galleries.json?cityname=${args.cityname}`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_GALLERIES,
        galleries: _data,
      })
    })
  }
}

const galleriesShow = (args) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/galleries/view/${args.galleryname}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_GALLERY,
        galleryname: args.galleryname,
        gallery: _data.gallery,
      })
    })
  }
}

const myGalleriesAction = (args) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_MY_GALLERIES,
    })
  }
}

const myReportsAction = (args) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_MY_REPORTS,
    })
  }
}

const reportsShow = (args) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/reports/view/${args.reportname}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_REPORT,
        report: _data.report,
      })
    })
  }
}

const reportsIndex = (args) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/reports.json?cityname=${args.cityname}`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_REPORTS,
        reports: _data,
      })
    })
  }
}

const venuesShow = (args) => {
  return (dispatch, getState) => {
    let url = `${config.apiUrl}/api/venues/view/${args.venuename}.json`
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_VENUE,
        venue: _data.venue,
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

export default {
  citiesIndex,
  citiesShow,

  galleriesIndex,
  galleriesShow,

  loginAction,
  logoutAction,
  profileAction,

  myReportsAction,
  myGalleriesAction,

  reportsShow,
  reportsIndex,

  setApiUrl,
  setLocation,
  siteShow,
  siteNewsitemsAction,

  venuesShow,
}
