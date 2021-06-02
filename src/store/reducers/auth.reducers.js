import produce from 'immer'
import { AUTH } from '@store/action-types'
import { ActionType } from 'redux-promise-middleware'

const initialState = {
  bio: null,
  loading: {
    generatePassword: false,
    loginUsingOTP: false,
    logoutUser: false,
  },
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${AUTH.GENERATE_PASSWORD}_${ActionType.Fulfilled}`: {
      state.loading.generatePassword = false
      break
    }
    case `${AUTH.GENERATE_PASSWORD}_${ActionType.Pending}`: {
      state.loading.generatePassword = true
      break
    }
    case `${AUTH.GENERATE_PASSWORD}_${ActionType.Rejected}`: {
      state.loading.generatePassword = false
      break
    }
    case `${AUTH.SET_USER}_${ActionType.Fulfilled}`: {
      state.loading.loginUsingOTP = false
      state.bio = action.payload
      break
    }
    case `${AUTH.SET_USER}_${ActionType.Pending}`: {
      state.loading.loginUsingOTP = true
      break
    }
    case `${AUTH.SET_USER}_${ActionType.Rejected}`: {
      state.loading.loginUsingOTP = false
      state.bio = null
      break
    }
    case `${AUTH.UNSET_USER}_${ActionType.Fulfilled}`: {
      state.bio = null
      state.loading.logoutUser = false
      break
    }
    case `${AUTH.UNSET_USER}_${ActionType.Pending}`: {
      state.loading.logoutUser = true
      break
    }
    case `${AUTH.UNSET_USER}_${ActionType.Rejected}`: {
      state.bio = null
      state.loading.logoutUser = false
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
