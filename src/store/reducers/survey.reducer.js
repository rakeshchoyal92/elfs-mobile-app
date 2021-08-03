import produce from 'immer'
import {
  CLEAR_RESPONSES,
  OVERRIDE_RESPONSE,
  SET_SURVEY_RESPONSE,
  SET_SURVEY_RESPONSES,
  SUBMIT_RESPONSES,
  SET_SURVEY,
  SET_SURVEYS,
} from '@store/action-types'
import { ActionType } from 'redux-promise-middleware'

const initialState = {
  surveys: [],
  selectedSurvey: null,
  response: [],
  response_dict: {},
  loading: {
    fetchingSurveys: false,
    fetchingSurvey: false,
    savingResponse: false,
  },
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SURVEY_RESPONSE: {
      const { key, value } = action.payload
      const keyIndex = state.response.findIndex((item) => item.key === key)
      // Remove all response till the current response index.
      // use case: user completed 10 questions and comes back to 5th and make
      // changes
      if (keyIndex >= 0) {
        state.response = state.response.slice(0, keyIndex)
      }
      state.response.push({ key, value })
      state.response_dict[key] = value
      break
    }
    case OVERRIDE_RESPONSE: {
      const { payload } = action
      state.response_dict = payload
      break
    }
    case `${SUBMIT_RESPONSES}_${ActionType.Fulfilled}`: {
      state.loading.savingResponse = false
      state.response = []
      state.response_dict = {}
      state.surveys = []
      state.selectedSurvey = null
      break
    }
    case `${SUBMIT_RESPONSES}_${ActionType.Pending}`: {
      state.loading.savingResponse = true
      break
    }
    case `${SUBMIT_RESPONSES}_${ActionType.Rejected}`: {
      state.loading.savingResponse = false
      // state.response = []
      break
    }
    case CLEAR_RESPONSES: {
      state.response = []
      state.response_dict = {}
      break
    }
    case `${SET_SURVEYS}_${ActionType.Fulfilled}`: {
      state.surveys = action.payload
      state.loading.fetchingSurveys = false
      break
    }
    case `${SET_SURVEYS}_${ActionType.Pending}`: {
      state.loading.fetchingSurveys = true
      break
    }
    case `${SET_SURVEYS}_${ActionType.Rejected}`: {
      state.loading.fetchingSurveys = false
      state.surveys = null
      break
    }
    case `${SET_SURVEY}_${ActionType.Fulfilled}`: {
      state.selectedSurvey = action.payload
      state.loading.fetchingSurvey = false
      break
    }
    case `${SET_SURVEY}_${ActionType.Pending}`: {
      state.loading.fetchingSurvey = true
      break
    }
    case `${SET_SURVEY}_${ActionType.Rejected}`: {
      state.loading.fetchingSurvey = false
      state.selectedSurvey = null
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
