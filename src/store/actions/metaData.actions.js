import { SET_METADATA } from '@store/action-types'

export const setMetaData = (values) => {
  return {
    type: SET_METADATA,
    payload: values,
  }
}
