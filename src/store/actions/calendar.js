import { SET_CALENDAR_MARKING } from '@store/action-types'

export const addParameterOfDay = (date, values) => {
  return {
    type: SET_CALENDAR_MARKING,
    payload: {
      date,
      values,
    },
  }
}
