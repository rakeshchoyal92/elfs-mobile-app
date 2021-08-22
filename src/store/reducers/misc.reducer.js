import produce from 'immer'
import { SET_LANGUAGE, SET_THEME, SET_USER_DETAILS } from '@store/action-types'
import { ActionType } from 'redux-promise-middleware'
import moment from 'moment'

const initialState = {
  language: 'en',
  theme: 'dark',
  userDetailsArray: null,
  userDetails: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE: {
      state.language = action.payload
      break
    }
    case SET_THEME: {
      state.theme = action.payload
      break
    }
    case `${SET_USER_DETAILS}_${ActionType.Fulfilled}`: {
      const { payload } = action
      const { dob, email, participantId, status, mobileNo } = payload
      state.userDetails = payload
      state.userDetailsArray = [
        {
          title: 'Date of Birth',
          description: moment(dob, 'YYYY-MM-DD').format('DD/MM/YYYY'),
        },
        { title: 'EMail', description: email },
        { title: 'Participant Id', description: participantId },
        { title: 'Status', description: status },
        { title: 'Mobile No', description: mobileNo },
        {
          title: 'Age',
          description: moment(dob, 'YYYY-MM-DD').fromNow().split(' ')[0],
        },
      ]
      break
    }
    case `${SET_USER_DETAILS}_${ActionType.Pending}`: {
      break
    }
    case `${SET_USER_DETAILS}_${ActionType.Rejected}`: {
      state.userDetails = null
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
