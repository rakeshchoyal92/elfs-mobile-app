import produce from 'immer'
import { SET_LANGUAGE } from '@store/action-types'

const initialState = {
  language: 'en',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE: {
      state.language = action.payload
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
