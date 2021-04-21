import produce from 'immer'
import {
  CLEAR_RESPONSES,
  SET_RESPONSE,
  SET_RESPONSES,
  SUBMIT_RESPONSES,
} from '@store/action-types'
import { ActionType } from 'redux-promise-middleware'

const initialState = {
  response: [],
  responses: [],
  response_dict: {},
  loading: {
    savingResponse: false,
  },
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESPONSE: {
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
    case `${SUBMIT_RESPONSES}_${ActionType.Fulfilled}`: {
      state.loading.savingResponse = false
      break
    }
    case `${SUBMIT_RESPONSES}_${ActionType.Pending}`: {
      state.loading.savingResponse = true
      break
    }
    case `${SUBMIT_RESPONSES}_${ActionType.Rejected}`: {
      state.loading.savingResponse = false
      break
    }
    case CLEAR_RESPONSES: {
      state.response = []
      state.response_dict = {}
      break
    }
    case `${SET_RESPONSES}_${ActionType.Fulfilled}`: {
      state.responses = action.payload
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
