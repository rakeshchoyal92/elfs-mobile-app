import {
  SET_CALENDAR_MARKING,
  SET_PARAMETER_DATA,
  SET_PARAMETER_DATA_ALL,
  SET_SELECTED_DAY,
  UPDATE_CALENDAR_MARKING,
} from '@store/action-types'
import { markingDots } from '@constants/strings'
import {
  saveParameter,
  getParameters,
  updateParameter,
} from '@api/calendar_parameter'
import moment from 'moment'

export const addParameterOfDay = (date, values) => async (dispatch) => {
  const calendarParams = makeParameter(values)
  const dateFormatted = moment(date, 'YYYY-MM-DD').format()
  const data = {
    date: dateFormatted,
    ...values,
  }

  return dispatch({
    type: SET_PARAMETER_DATA,
    async payload() {
      return await saveParameter(data)
    },
  }).then((data) => {
    return dispatch({
      type: SET_CALENDAR_MARKING,
      payload: {
        date,
        values: data.value,
        param: calendarParams,
      },
    })
  })
}

export const getParameterOfTheDay = () => {
  return {
    type: SET_PARAMETER_DATA_ALL,
    async payload() {
      let values = await getParameters()
      let paramFormatted = {}
      let valuesFormatted = []
      values.map((value) => {
        const { date, ...restValue } = value
        const calendarParams = makeParameter(restValue)
        const dateFormatted = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
        const data = {
          values: restValue,
          date: dateFormatted,
        }
        valuesFormatted.push(data)
        paramFormatted[dateFormatted] = calendarParams
      })
      return {
        values: valuesFormatted,
        parameters: paramFormatted,
      }
    },
  }
}

export const updateAParameter = (date, values) => (dispatch) => {
  const calendarParams = makeParameter(values)
  const dateFormatted = moment(date, 'YYYY-MM-DD').format()
  const data = {
    date: dateFormatted,
    ...values,
  }
  console.log('START')
  return dispatch({
    type: SET_PARAMETER_DATA,
    async payload() {
      console.log('ONE')
      let res = await updateParameter(data)
      console.log('TWO')
      return res
    },
  }).then((data) => {
    console.log('THREE')
    return dispatch({
      type: UPDATE_CALENDAR_MARKING,
      payload: {
        date,
        values: data.value,
        param: calendarParams,
      },
    })
  })
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
