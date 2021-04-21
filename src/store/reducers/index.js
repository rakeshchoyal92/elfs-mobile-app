import { combineReducers } from 'redux'
import questions from './questions.reducer'
import survey from './survey.reducer'
import metaData from './metaData.reducer'
import misc from './misc.reducer'
import calendar from './calendar.reducer'

// Add your new reducer here
const reducers = {
  questions,
  survey,
  metaData,
  misc,
  calendar,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
