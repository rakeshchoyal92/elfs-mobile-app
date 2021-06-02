import EP from '@src/api/endpoints'
import client from '@src/api'

export const generatePassword = (data) => {
  return client.get(EP.GENERATE_PASSWORD(data)).then((res) => res.data)
}

export const loginUsingOTP = (data) => {
  return client.post(EP.LOGIN_OTP(), data).then((res) => res.data)
}

export const logoutUser = () => {
  return client.delete(EP.LOGOUT()).then((res) => res.data)
}
