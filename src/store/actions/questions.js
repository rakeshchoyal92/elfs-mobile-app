import { SET_QUESTIONS, ADD_QUESTION_TO_SURVEY } from '@store/action-types'
import { getQuestions as getQuestionsApi } from '@api/questions'

export const getQuestions = () => {
  return {
    type: SET_QUESTIONS,
    async payload() {
      return await getQuestionsApi()
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
