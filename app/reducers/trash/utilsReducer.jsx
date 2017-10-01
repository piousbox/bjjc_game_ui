
import {
  SET_API_URL,
} from '../constants/AppConstants'

const setApiUrl = (state = 'none', action) => {

  console.log('+++ +++ utilsReducer is called:', action)

  switch (action.actionType) {
    case SET_API_URL:
      return action.apiUrl
    default:
      return state
  }
}

export default {
  setApiUrl,
}


