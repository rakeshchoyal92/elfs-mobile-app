import produce from 'immer'
import {
  SET_CALENDAR_MARKING,
  SET_CALENDAR_MARKINGS,
  SET_PARAMETER_DATA,
  SET_PARAMETER_DATA_ALL,
  SET_SELECTED_DAY,
} from '@store/action-types'
import { ActionType } from 'redux-promise-middleware'

const initialState = {
  parameters: {}, // holds formatted values supported by react-native-calendar
  values: [], // Holds raw values -> date and selected values
  selectedParameterWithValues: null, // Holds params of the selected date
  markedDateFormatted: {}, // Holds marked date value with formatted values
  loading: {
    setParameter: false,
    fetchParameters: false,
  },
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CALENDAR_MARKINGS: {
      state.parameters = action.payload
      break
    }
    case SET_CALENDAR_MARKING: {
      const { date, param, values } = action.payload
      state.parameters[date] = param
      state.values.push({ date, values })
      state.selectedParameterWithValues = { date, values }
      break
    }
    case `${SET_PARAMETER_DATA}_${ActionType.Fulfilled}`: {
      state.loading.setParameter = false
      break
    }
    case `${SET_PARAMETER_DATA}_${ActionType.Pending}`: {
      state.loading.setParameter = true
      break
    }
    case `${SET_PARAMETER_DATA}_${ActionType.Rejected}`: {
      state.loading.setParameter = false
      break
    }
    case `${SET_PARAMETER_DATA_ALL}_${ActionType.Fulfilled}`: {
      const { values, parameters } = action.payload
      state.values = values
      state.parameters = parameters
      state.loading.fetchParameters = false
      break
    }
    case `${SET_PARAMETER_DATA_ALL}_${ActionType.Pending}`: {
      state.loading.fetchParameters = true
      break
    }
    case `${SET_PARAMETER_DATA_ALL}_${ActionType.Rejected}`: {
      state.values = []
      state.parameters = {}
      state.loading.fetchParameters = false
      break
    }
    case SET_SELECTED_DAY: {
      const date = action.payload
      const params = state.parameters[date]
      state.markedDateFormatted = {
        [date]: {
          ...params,
          selected: true,
          marked: true,
          selectedColor: '#b1acac',
        },
      }
      const selectedParameterWithValuesParam = state.values.find(
        (item) => item.date === date
      )
      if (selectedParameterWithValuesParam) {
        state.selectedParameterWithValues = selectedParameterWithValuesParam
      } else {
        state.selectedParameterWithValues = null
      }
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
