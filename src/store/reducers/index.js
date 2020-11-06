import { combineReducers } from 'redux'
import questions from './questions'
import responses from './response'
import metaData from './metaData'

// Add your new reducer here
const reducers = {
  questions,
  responses,
  metaData,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
