import {
  SET_SURVEY_RESPONSE,
  CLEAR_RESPONSES,
  SUBMIT_RESPONSES,
  SET_SURVEYS,
  SET_SURVEY,
} from '@store/action-types'
// import { saveSurvey, getSurveys } from '@api/survey.api'
import * as surveyApi from '@api/survey.api'

export const setASurveyResponse = (key, value) => {
  return {
    type: SET_SURVEY_RESPONSE,
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

export const submitSurvey = (data, surveyId, shouldUpdate) => {
  const modData = data.reduce((acc, val) => {
    if (val.value === '_VALUE_ANY') {
      acc[val.key] = null
    } else {
      acc[val.key] = val.value
    }
    return acc
  }, {})

  return {
    type: SUBMIT_RESPONSES,
    async payload() {
      if (shouldUpdate) {
        return await surveyApi.updateSurvey(modData, surveyId)
      } else {
        return await surveyApi.saveSurvey(modData, surveyId)
      }
    },
  }
}

export const getSurveys = () => {
  return {
    type: SET_SURVEYS,
    async payload() {
      return await surveyApi.getSurveys()
    },
  }
}

export const getASurvey = (surveyId) => {
  return {
    type: SET_SURVEY,
    async payload() {
      return await surveyApi.getASurvey(surveyId)
    },
  }
}

export const getMetaData = (surveyId) => {
  return {
    type: 'GET_METADATA',
    async payload() {
      return await surveyApi.getMetaData(surveyId)
    },
  }
}
