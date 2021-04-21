import produce from 'immer'
import {
  ADD_QUESTION_TO_SURVEY,
  DELETE_A_QUESTION,
  RESET_SURVEY_QUESTIONS,
  SET_QUESTION,
  SET_QUESTION_ID_TO_EDIT,
  SET_QUESTIONS,
  SET_SURVEY,
  SET_SURVEY_ID,
  UPDATE_QUESTION,
} from '../action-types'
import { PROMISE_STATUS } from '@constants/strings'
import { SET_QUESTION_KEY_TO_DETAIL } from '@store/action-types'

const initialState = {
  questions: [],
  questionsAsDict: {},
  surveyQuestions: null,
  questionIdToEdit: null,
  questionKeyToDetail: null,
  currentSurveyKey: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_QUESTION}_${PROMISE_STATUS.FULFILLED}`: {
      state.questions.push(action.payload)
      break
    }
    case `${SET_QUESTIONS}_${PROMISE_STATUS.FULFILLED}`: {
      const { payload } = action
      state.questions = payload
      // Add first question to survey
      const noOfQuestionsToSkip = 1
      let modPayload = payload.slice(noOfQuestionsToSkip)
      if (payload) {
        state.surveyQuestions = [modPayload[0]]
        state.currentSurveyKey = modPayload[0].key
      }

      action.payload.forEach((question) => {
        state.questionsAsDict[question.key] = question.questionText
      })
      break
    }
    case `${SET_QUESTION_ID_TO_EDIT}`: {
      const payload = action.payload
      if (payload) {
        state.questionIdToEdit = action.payload
      } else {
        state.questionIdToEdit = null
      }
      break
    }
    case `${SET_QUESTION_KEY_TO_DETAIL}`: {
      const payload = action.payload
      if (payload) {
        state.questionKeyToDetail = action.payload
      } else {
        state.questionKeyToDetail = null
      }
      break
    }
    case `${UPDATE_QUESTION}_${PROMISE_STATUS.FULFILLED}`: {
      const payload = action.payload
      const { id } = payload
      state.questions = state.questions.map((question) => {
        if (question.id === id) {
          return payload
        }
        return question
      })
      break
    }
    case `${DELETE_A_QUESTION}_${PROMISE_STATUS.FULFILLED}`: {
      const id = action.payload
      state.questions = state.questions.filter((question) => question.id !== id)
      break
    }
    case RESET_SURVEY_QUESTIONS: {
      state.surveyQuestions = null
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
          console.error('Next question is not set!')
        }
      }
      break
    }
    default:
      return state
  }
}

export default produce(reducer, initialState)
