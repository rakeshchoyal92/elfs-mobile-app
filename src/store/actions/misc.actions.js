import { SET_LANGUAGE } from '@store/action-types'

export const setLanguage = (lang) => {
  return {
    type: SET_LANGUAGE,
    payload: lang,
  }
}
