import produce from 'immer'
import { SET_METADATA } from '../action-types'

const initialState = {
  server: {
    PARTICIPANT_COMPLETED_LAST_CYCLE: 'Yes',
    ULTRASOUND_SCAN_PREVIOUSLY_ENTERED: 'No',
    INDICATED_CLINICAL_PREGNANCY: 'Yes',
  },
}

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
