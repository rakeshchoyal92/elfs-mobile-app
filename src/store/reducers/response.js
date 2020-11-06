import produce from 'immer'
import { SET_RESPONSE } from '../action-types'

const initialState = {
  responses: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESPONSE: {
      const { key, value } = action.payload
      const keyIndex = state.responses.findIndex((item) => item.key === key)
      // Remove all response till the current response index.
      // use case: user completed 10 questions and comes back to 5th and make
      // changes
      if (keyIndex >= 0) {
        state.responses = state.responses.slice(0, keyIndex)
      }
      state.responses.push({ key, value })
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
