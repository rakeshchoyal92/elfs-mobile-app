import produce from 'immer'
import { SET_METADATA } from '@store/action-types'
import moment from 'moment'

const initialState = {
  server: {
    FIRST_SURVEY: false,
    PREVIOUS_WEIGHT: true,
    PREVIOUS_REGULAR_MEDICATION: false,
    PREVIOUS_RELATIONSHIP_DETAILS: false,
    HAS_SURGICAL_HISTORY: false,
    PREVIOUS_PREGNANCY_STATUS: false,
    CURRENT_PARTNER_GENDER_MALE: true,
    CURRENT_PARTNER_SEX_AT_BIRTH_MALE: false,
    RECRUITMENT_DATE: true,
    PREVIOUS_ULTRASOUND_PERFORMED: false,
    PREVIOUS_PREGNANCY_DUE_DATE: true,
    // FIRST_DAY_LAST_PERIOD: moment('2020/01/01', 'YYYY/MM/DD'),
    TUBAL_PATENCY_PERFORMED_ANSWERED_PREVIOUSLY: false,
    TUBAL_PATENCY_PERFORMED_ANSWER_DATE_GREATER_6_MONTHS: false,
    SEMEN_ANALYSIS_PERFORMED_ANSWER_D_DATE_GREATER_6_MONTHS: false,
    EXPLICIT_MONTHS_TRYING_FOR_PREGNANCY_GREATER_EQUAL_6_MONTHS: false,
    CUMULATIVE_MONTHS_TRYING_FOR_PREGNANCY_GREATER_EQUAL_6_MONTHS: false,
    AGE_AT_SURVEY_DATE_GREATER_EQUAL_35: false,
    EXPLICIT_MONTHS_TRYING_FOR_PREGNANCY_GREATER_EQUAL_12_MONTHS: true,
    CUMULATIVE_MONTHS_TRYING_PREGNANCY_GREATER_EQUAL_12_MONTHS: true,
    SEMEN_ANALYSIS_PERFORMED_ANSWERED_PREVIOUSLY: false,
    TRYING_GET_PREGNANT: null,
  },
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_METADATA: {
      state.server = action.payload
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
