
import { combineReducers } from 'redux'

import { setApiUrl } from './utilsReducer'

const combinedApp = combineReducers({
  setApiUrl,
})

export default combinedApp
