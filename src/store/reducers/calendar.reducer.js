import produce from 'immer'
import {
  SET_CALENDAR_MARKING,
  SET_CALENDAR_MARKINGS,
  SET_SELECTED_DAY,
} from '@store/action-types'
import { markingDots } from '@constants/strings'

const initialState = {
  parameters: {},
  selectedParameter: null,
  markedDate: {},
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
    case SET_SELECTED_DAY: {
      const date = action.payload
      const mm = state.parameters[date]
      state.markedDate = {
        [date]: {
          ...mm,
          selected: true,
          marked: true,
          selectedColor: '#b1acac',
        },
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

    if (property === 'bleeding') {
      const bleedingValue = values[property]
      output = {
        ...output,
        selected: true,
        selectedColor:
          bleedingValue === 'Spot'
            ? '#ea7697'
            : bleedingValue === 'Light'
            ? '#e94070'
            : bleedingValue === 'Normal'
            ? '#ab2e52'
            : '#8f022a',
      }
    }
  }

  return output
}
export default produce(reducer, initialState)
