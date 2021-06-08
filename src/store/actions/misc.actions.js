import { SET_LANGUAGE, SET_THEME } from '@store/action-types'

export const setLanguage = (lang) => {
  return {
    type: SET_LANGUAGE,
    payload: lang,
  }
}

export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: theme,
  }
}
