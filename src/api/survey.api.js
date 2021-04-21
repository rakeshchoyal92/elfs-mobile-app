import EP from '@src/api/endpoints'
import client from '@src/api'

export const saveSurvey = (data) => {
  return client.post(EP.SURVEYS(), data).then((res) => res.data)
}

export const getSurveys = (data) => {
  return client.get(EP.SURVEYS(), data).then((res) => res.data)
}
