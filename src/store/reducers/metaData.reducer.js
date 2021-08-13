import produce from 'immer'
import { SET_METADATA } from '@store/action-types'
import moment from 'moment'

const initialState = {}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_METADATA: {
      state.server = action.payload
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
