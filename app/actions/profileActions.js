
import { BjjcRouter } from '../components/App'

import {
  SET_PROFILE,
  FBACCOUNT,
} from '../constants'

const profileAction = () => {
  return (dispatch, getState) => {
    let fbAccount = localStorage.getItem(FBACCOUNT)
    if (fbAccount) {
      fetch(BjjcRouter.profile, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: fbAccount,
      }).then(r => r.json()).then(_data => {
        fbAccount = Object.assign({}, JSON.parse(fbAccount), _data)
        // console.log('+++ setting in-app existing profile:', fbAccount)
        dispatch({ type: SET_PROFILE, fbAccount: fbAccount })
      })
    }
    dispatch({ type: SET_PROFILE, fbAccount: null })
  }
}

/**
 * this gets called from facebook directly, I need to call the api as well to get the long token.
 */
const loginAction = (fbAccount) => {
  return (dispatch, getState) => {
    fetch(BjjcRouter.fbLogin, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(fbAccount),
    }).then(r => r.json()).then(_data => {
      fbAccount = Object.assign({}, fbAccount, _data)
      console.log('+++ +++ loginAction, I will localStorage this fbAccount:', fbAccount)
      localStorage.setItem(FBACCOUNT, JSON.stringify(fbAccount))
      dispatch(profileAction())
      dispatch({ type: SET_PROFILE, fbAccount: fbAccount })
    })
  }
}

const logoutAction = () => {
  localStorage.removeItem(FBACCOUNT)
  return({ type: SET_PROFILE, fbAccount: null }) 
}

export default {
  profileAction, loginAction, logoutAction,
}

