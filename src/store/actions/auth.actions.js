import { AUTH } from '@store/action-types'
import * as authApi from '@api/auth.api'
import { storeData } from '@utils/storage'

export const generatePassword = (emailOrMobileNo) => {
  return {
    type: AUTH.GENERATE_PASSWORD,
    async payload() {
      return await authApi.generatePassword(emailOrMobileNo)
    },
  }
}

export const loginUsingOTP = (data) => {
  return {
    type: AUTH.SET_USER,
    async payload() {
      let res = await authApi.loginUsingOTP(data)
      await storeData(res)
      return res
    },
  }
}

export const logoutUser = () => {
  return {
    type: AUTH.UNSET_USER,
    async payload() {
      return await authApi.logoutUser()
    },
  }
}
