import produce from 'immer'
import { ADD_QUESTION_TO_SURVEY, SET_QUESTIONS } from '../action-types'
import { PROMISE_STATUS } from '@constants/strings'

const initialState = {
  questions: [],
  surveyQuestions: null,
  questionIdToEdit: null,
  questionKeyToDetail: null,
  currentSurveyKey: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_QUESTIONS}_${PROMISE_STATUS.FULFILLED}`: {
      const { payload } = action
      state.questions = payload
      // Add first question to survey
      if (payload) {
        state.surveyQuestions = [payload[0]]
        state.currentSurveyKey = payload[0].key
      }
      break
    }
    case `${ADD_QUESTION_TO_SURVEY}`: {
      const { currentKey, nextKey } = action.payload

      const currentQuestionPos = state.surveyQuestions.findIndex(
        (q) => q.key === currentKey
      )

      if (currentQuestionPos === 0) {
        const nextQuestion = state.questions.find(
          (question) => question.key === nextKey
        )
        if (nextQuestion) {
          state.surveyQuestions.push(nextQuestion)
        } else {
          message.warn('Next question is not set!')
        }
      } else {
        // Remove all question after the one user attempting to answer
        // use case: user completed 10 question and go back to 5th question to
        // make changes
        state.surveyQuestions = state.surveyQuestions.slice(
          0,
          currentQuestionPos + 1
        )
        const nextQuestion = state.questions.find(
          (question) => question.key === nextKey
        )
        if (nextQuestion) {
          state.surveyQuestions.push(nextQuestion)
        } else {
          console.warn('Next question is not set!')
        }
      }
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
