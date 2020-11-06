import { SET_RESPONSE } from '@store/action-types'

export const setAResponse = (key, value) => {
  return {
    type: SET_RESPONSE,
    payload: {
      key: key,
      value: value,
    },
  }
}
