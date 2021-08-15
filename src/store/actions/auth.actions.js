import { AUTH } from '@store/action-types'
import * as authApi from '@api/auth.api'

import { removeData, storeData } from '@utils/storage'

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

export const logoutUser = () => async (dispatch) => {
  const resp1 = dispatch({
    type: AUTH.UNSET_USER,
    async payload() {
      return await authApi.logoutUser()
    },
  })

  return resp1.then(() =>
    dispatch({
      type: 'RESET_STORE',
      async payload() {
        return await removeData()
      },
    })
  )
}
