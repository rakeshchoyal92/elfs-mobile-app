import {
  SET_QUESTIONS,
  ADD_QUESTION_TO_SURVEY,
  RESET_SURVEY_QUESTIONS,
} from '@store/action-types'
import { getQuestions as getQuestionsApi } from '@api/questions.api'

export const getQuestions = () => {
  return {
    type: SET_QUESTIONS,
    async payload() {
      return getQuestionsApi()
    },
  }
}

export const addQuestionToSurvey = (currentKey, nextKey) => {
  return {
    type: ADD_QUESTION_TO_SURVEY,
    payload: {
      currentKey,
      nextKey,
    },
  }
}

export const resetSurveyQuestions = () => {
  return {
    type: RESET_SURVEY_QUESTIONS,
    payload: null,
  }
}
