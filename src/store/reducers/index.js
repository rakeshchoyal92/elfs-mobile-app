import { combineReducers } from 'redux'
import questions from './questions.reducer'
import survey from './survey.reducer'
import metaData from './metaData.reducer'
import misc from './misc.reducer'
import calendar from './calendar.reducer'
import auth from './auth.reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActionType } from 'redux-promise-middleware'

// Add your new reducer here
const reducers = {
  questions,
  survey,
  metaData,
  misc,
  calendar,
  auth,
}

const appReducer = combineReducers(reducers)

const rootReducer = (state, action) => {
  if (action.type === `RESET_STORE_${ActionType.Fulfilled}`) {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer
