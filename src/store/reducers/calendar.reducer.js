import produce from 'immer'
import {
  SET_CALENDAR_MARKING,
  SET_CALENDAR_MARKINGS,
} from '@store/action-types'
import { markingDots } from '@constants/strings'

const initialState = {
  parameters: {},
  selectedParameter: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CALENDAR_MARKINGS: {
      state.parameters = action.payload
      break
    }
    case SET_CALENDAR_MARKING: {
      const { date, values } = action.payload
      state.parameters[date] = makeParameter(values)
      state.selectedParameter = {
        date,
        values,
      }
      break
    }
    default:
      return state
  }
}

/**
 * Function to mark dots
 * @param values
 */
const makeParameter = (values) => {
  let output = {
    dots: [],
  }

  for (const property in values) {
    if (markingDots[property]) {
      output['dots'].push(markingDots[property])
    }
  }
  return output
}
export default produce(reducer, initialState)
