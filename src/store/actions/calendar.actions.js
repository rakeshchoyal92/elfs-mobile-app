import { SET_CALENDAR_MARKING, SET_SELECTED_DAY } from '@store/action-types'
import { markingDots } from '@constants/strings'

export const addParameterOfDay = (date, values) => {
  const calendarParams = makeParameter(values)
  return {
    type: SET_CALENDAR_MARKING,
    payload: {
      date,
      values,
      param: calendarParams,
    },
  }
}

export const setSelectedDayInCalendar = (date) => {
  return {
    type: SET_SELECTED_DAY,
    payload: date,
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
