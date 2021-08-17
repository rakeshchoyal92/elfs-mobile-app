import { SET_LANGUAGE, SET_THEME, SET_USER_DETAILS } from '@store/action-types'
import * as userApi from '@api/user.api'

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

export const getUserDetails = () => {
  return {
    type: SET_USER_DETAILS,
    async payload() {
      return await userApi.getUserDetails()
    },
  }
}
