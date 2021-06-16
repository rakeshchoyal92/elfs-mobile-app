import EP from '@src/api/endpoints'
import client from '@src/api'

export const saveParameter = (data) => {
  return client.post(EP.CALENDAR_PARAMETER(), data).then((res) => res.data)
}

export const getParameters = (data) => {
  return client.get(EP.CALENDAR_PARAMETER(), data).then((res) => res.data)
}
