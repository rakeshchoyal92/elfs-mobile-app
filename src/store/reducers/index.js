import { combineReducers } from 'redux'
import questions from './questions'
import responses from './response'
import metaData from './metaData'
import misc from './misc'
import calendar from './calendar'

// Add your new reducer here
const reducers = {
  questions,
  responses,
  metaData,
  misc,
  calendar,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
