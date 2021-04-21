import {
  SET_RESPONSE,
  CLEAR_RESPONSES,
  SUBMIT_RESPONSES,
  SET_RESPONSES,
  ADD_QUESTION_TO_SURVEY,
} from '@store/action-types'
import { saveSurvey, getSurveys } from '@api/survey.api'

export const setAResponse = (key, value) => {
  return {
    type: SET_RESPONSE,
    payload: {
      key: key,
      value: value,
    },
  }
}

export const clearResponses = () => {
  return {
    type: CLEAR_RESPONSES,
    payload: null,
  }
}

export const submitSurvey = (data) => {
  const modData = data.reduce((acc, val) => {
    acc[val.key] = val.value
    return acc
  }, {})

  return {
    type: SUBMIT_RESPONSES,
    async payload() {
      return await saveSurvey(modData)
    },
  }
}

export const getAllSurveys = () => {
  return {
    type: SET_RESPONSES,
    async payload() {
      return await getSurveys()
    },
  }
}
