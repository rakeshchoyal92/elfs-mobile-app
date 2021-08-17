import EP from '@src/api/endpoints'
import client from '@src/api'

export const getUserDetails = () => {
  return client.get(EP.USER_DETAILS()).then((res) => res.data)
}
