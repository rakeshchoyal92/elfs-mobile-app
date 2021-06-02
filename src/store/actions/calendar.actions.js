import { SET_CALENDAR_MARKING, SET_SELECTED_DAY } from '@store/action-types'

export const addParameterOfDay = (date, values) => {
  return {
    type: SET_CALENDAR_MARKING,
    payload: {
      date,
      values,
    },
  }
}

export const setSelectedDayInCalendar = (date) => {
  return {
    type: SET_SELECTED_DAY,
    payload: date,
  }
}
