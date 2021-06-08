import produce from 'immer'
import { SET_LANGUAGE, SET_THEME } from '@store/action-types'

const initialState = {
  language: 'en',
  theme: 'light',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE: {
      state.language = action.payload
      break
    }
    case SET_THEME: {
      state.theme = action.payload
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
