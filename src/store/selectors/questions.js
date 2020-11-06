import { createSelector } from 'reselect'

export const questionsSelector = (state) => {
  return state.questions.questions
}

const questionIdToEditSelector = (state) => state.questions.questionIdToEdit
const questionKeyToDetailSelector = (state) =>
  state.questions.questionKeyToDetail

export const questionByKeySelector = createSelector(
  [questionsSelector, questionKeyToDetailSelector],
  (questions, questionKeyToDetail) => {
    return questions.find((question) => question.key === questionKeyToDetail)
  }
)

export const allQuestionKeysSelector = createSelector(
  [questionsSelector],
  (questions) => {
    return questions
      .map((question) => question.key)
      .filter((item) => item !== null)
  }
)

export const questionToEditSelector = createSelector(
  [questionsSelector, questionIdToEditSelector],
  (questions, questionIdToEdit) => {
    return questions.find((question) => question.id === questionIdToEdit)
  }
)
