
/*
 * reportsReducer
 */

import {
  SET_REPORT,
  SET_REPORTS,
} from '../constants/AppConstants'

import AppDispatcher from '../dispatcher/AppDispatcher'
import config from 'config'

const reportsReducer = (state=[], action) => {
  switch (action.type) {
    case SET_REPORTS:
      return action.reports
    default:
      return state
  }
}

const reportsShowReducer = (state={}, action) => {
  switch (action.type) {
    case SET_REPORT:
      return action.report
    default:
      return state
  }
}

export default {
  reportsReducer,
  reportsShowReducer,
}
