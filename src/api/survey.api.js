import EP from '@src/api/endpoints'
import client from '@src/api'

export const saveSurvey = (data, surveyId) => {
  return client.post(EP.SURVEYS_ID(surveyId), data).then((res) => res.data)
}

export const updateSurvey = (data, surveyId) => {
  return client.put(EP.SURVEYS_ID(surveyId), data).then((res) => res.data)
}

export const getSurveys = (data) => {
  return client.get(EP.SURVEYS(), data).then((res) => res.data)
}

export const getASurvey = (surveyId) => {
  return client.get(EP.SURVEYS_ID(surveyId)).then((res) => res.data)
}

export const getMetaData = (surveyId) => {
  return client.get(EP.META_DATA(surveyId)).then((res) => res.data)
}
