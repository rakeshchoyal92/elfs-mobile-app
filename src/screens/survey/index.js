import React, { useEffect, useState, useRef } from 'react'
import {
  SafeAreaView,
  View,
  Platform,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { questionsSelector } from '@store/selectors/questions'
import { connect } from 'react-redux'
import { addQuestionToSurvey, getQuestions } from '@actions/questions'
import { RESPONSE_TYPES } from '@constants/strings'
import moment from 'moment'
import { setAResponse } from '@actions/response'
import {
  RenderLabel,
  RenderNumberInput,
  RenderTextAreaInput,
  RenderTextInput,
  RenderCheckbox,
  RenderDate,
  RenderQuestionText,
  RenderRadio,
  RenderEndOfQuestion,
  TunnelRender,
  RenderBoolean,
} from '@components/response'
import * as Animatable from 'react-native-animatable'
import AppLayout from '@components/layout'

const initialValues = {}

const VARIABLE_MATCHING_STRATEGY = {
  EQUAL: 'EQUAL',
  GREATER: 'GREATER',
  LESSER: 'LESSER',
  'TRUE/FALSE': 'TRUE/FALSE',
  'NULL/NOT_NULL': 'NULL/NOT_NULL',
}

const INITIAL_VALUES = {
  first_day_last_period: moment('2020/01/01', 'YYYY/MM/DD'),
  current_weight: '21',
  regular_medication: 'Regular Medication',
}

const SurveyContainer = (props) => {
  const {
    getQuestions,
    surveyQuestions,
    addQuestionToSurvey,
    setAResponse,
    responses,
    metaData,
    navigation,
    questions,
    // initialValues = USERS.PARTICIPANT ? initialValuesParticipant : {},
    initialValues = INITIAL_VALUES,
  } = props

  const [currentSurveyKey, setCurrentSurveyKey] = useState()
  const [nextSurveyKey, setNextSurveyKey] = useState()
  const [viewHeights, setViewHeights] = useState([-100])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState()
  const listViewRef = useRef()
  const [
    goToQuestionOnReachingTunnel,
    setGoToQuestionOnReachingTunnel,
  ] = useState()

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

  /**
   * Effect to bring the current survey question to view
   */
  useEffect(() => {
    if (surveyQuestions && surveyQuestions.length >= 3 && nextSurveyKey) {
      let newOffset = viewHeights
        .slice(0, currentQuestionIndex)
        .reduce((acc, item) => {
          return acc + item
        }, 0)
      listViewRef.current.scrollTo({ y: newOffset, animate: false })
    }
  }, [viewHeights])

  /**
   * Function to set heights of each question view.
   * This is used to auto scroll to next question after user records
   * their response
   * @param index
   * @param height
   */
  const setHeights = (index, height) => {
    if (viewHeights.length === 0) {
      setViewHeights([height])
    } else {
      //If the user is change response of already answered question
      if (index < viewHeights.length) {
        let newViewHeights = viewHeights.slice(0, index + 1)
        setViewHeights(newViewHeights)
      } else {
        setViewHeights((prev) => [...prev, height])
      }
    }
  }

  let responseFlat = responses.reduce((acc, response) => {
    const { key, value } = response
    acc[key] = value
    return acc
  }, {})

  /**
   * Function to evaluate condition to true/false
   * @param key: condition key
   * @returns {string} '_VALUE_TRUE OR _VALUE_FALSE'
   * _VALUE_TRUE refers true and _VALUE_FALSE as false
   */
  const evaluateCondition = (key) => {
    /**
     * Evaluates to true/false
     * @param condition
     * @returns {boolean || string}
     */
    const evaluate = (condition) => {
      const {
        extractValueFrom,
        matchingStrategy,
        onValue,
        variable,
      } = condition

      if (extractValueFrom === 'SERVER') {
        const valueObtainedFromServer = metaData[variable.toUpperCase()]
        switch (matchingStrategy) {
          case VARIABLE_MATCHING_STRATEGY['NULL/NOT_NULL']: {
            if (onValue === '_VALUE_NULL') {
              return valueObtainedFromServer === null
            }
            return valueObtainedFromServer !== null
          }

          case VARIABLE_MATCHING_STRATEGY['TRUE/FALSE']: {
            if (onValue === '_VALUE_FALSE') {
              return valueObtainedFromServer === false
            }
            return valueObtainedFromServer === true
          }

          case VARIABLE_MATCHING_STRATEGY.EQUAL: {
            return valueObtainedFromServer === onValue
          }
        }
      } else {
        console.log('Inside else block')
      }
    }

    let condition = questions.find((question) => question.key === key)
    const { type, conditions, conditionalNext } = condition

    if (type === 'SINGLE') {
      let conditionEvaluated = evaluate(conditions[0])
      if (conditionEvaluated) {
        let nextQuestionKey = conditionalNext.goToOnTrue
        if (nextQuestionKey.startsWith('c_')) {
          return evaluateCondition(nextQuestionKey)
        } else {
          return nextQuestionKey
        }
      } else {
        let nextQuestionKey = conditionalNext.goToOnFalse
        if (nextQuestionKey.startsWith('c_')) {
          return evaluateCondition(nextQuestionKey)
        } else {
          return nextQuestionKey
        }
      }
    } else {
      let resultExpression = ''
      let result

      conditions.map((condition, index) => {
        let currentConditionEvaluatedValue = evaluate(condition)

        let logicalOperatorToNextQ =
          condition.logicalOperatorToNextQ === 'AND' ? '&&' : '||'

        // result = currentConditionEvaluatedValue
        // evaluate conditions based on logicalOperatorToNextQ.
        // last element has no logicalOperatorToNextQ.
        // first index evaluate, second index evaluate with first index's logicalOperatorToNextQ and so on

        resultExpression += `${currentConditionEvaluatedValue}`
        if (index !== conditions.length - 1) {
          resultExpression += `${logicalOperatorToNextQ} `
        }
      })

      result = eval(resultExpression)
      let goToOnTrue = conditionalNext.goToOnTrue
      let goToOnFalse = conditionalNext.goToOnFalse

      if (result) {
        if (goToOnTrue.startsWith('c_')) {
          return evaluateCondition(goToOnTrue)
        } else {
          return goToOnTrue
        }
      } else {
        if (goToOnFalse.startsWith('c_')) {
          return evaluateCondition(goToOnFalse)
        } else {
          return goToOnFalse
        }
      }
    }
  }

  const handleGetNextQuestion = (question, valueSelected) => {
    const { nextQuestions, key, goToOnEndOfNextSurvey } = question
    let nextQuestionKey = null

    if (goToOnEndOfNextSurvey) {
      setGoToQuestionOnReachingTunnel(goToOnEndOfNextSurvey)
    }

    // Store response in redux
    setAResponse(key, valueSelected)

    if (typeof valueSelected === 'boolean') {
      if (valueSelected) {
        valueSelected = '_VALUE_TRUE'
      } else {
        valueSelected = '_VALUE_FALSE'
      }
    }

    if (valueSelected)
      nextQuestions.map((nq) => {
        let goTo = nq.goTo

        // Check for onValue. If absent it should mean go to next question on
        // any value. Eg., user input on text, dates, numbers
        let valueS = nextQuestions.find((nq) => nq.onValue === valueSelected)
        if (!valueS) {
          valueSelected = '_VALUE_ANY'
        }

        if (nq.onValue === valueSelected) {
          let isNextCondition = goTo.startsWith('c_')
          if (isNextCondition) {
            nextQuestionKey = evaluateCondition(goTo)
          } else {
            nextQuestionKey = goTo
          }
        }
      })

    setCurrentSurveyKey(key)
    setNextSurveyKey(nextQuestionKey)
    addQuestionToSurvey(key, nextQuestionKey)
  }

  const renderAQuestion = (question, index) => {
    const { responseType, questionText, isEndOfSurvey, isTunnel } = question
    const props = {
      question,
      handleGetNextQuestion,
      initialValues,
      setAResponse,
      onInitialValueGoToAutoNext: true,
    }

    let isTunnelAndMoveToBreakpoint = isTunnel && goToQuestionOnReachingTunnel
    let nextQuestionKey = null

    if (isTunnelAndMoveToBreakpoint) {
      if (goToQuestionOnReachingTunnel.startsWith('c_')) {
        nextQuestionKey = evaluateCondition(goToQuestionOnReachingTunnel)
      } else {
        nextQuestionKey = goToQuestionOnReachingTunnel
      }
    }

    const renderValues = () => {
      switch (responseType) {
        case RESPONSE_TYPES.BOOLEAN:
          return <RenderBoolean {...props} />
        case RESPONSE_TYPES.RADIO:
          return <RenderRadio {...props} />
        case RESPONSE_TYPES.TEXT:
          return <RenderTextInput {...props} />
        case RESPONSE_TYPES.TEXTAREA:
          return <RenderTextAreaInput {...props} />
        case RESPONSE_TYPES.NUMBER:
          return <RenderNumberInput {...props} />
        case RESPONSE_TYPES.LABEL:
          return <RenderLabel {...props} />
        case RESPONSE_TYPES.CHECKBOX:
          return <RenderCheckbox {...props} />
        case RESPONSE_TYPES.DATE:
          return <RenderDate {...props} />
      }
    }

    const renderContainers = () => {
      if (isTunnelAndMoveToBreakpoint) {
        return (
          <>
            <TunnelRender
              nextQuestionKey={nextQuestionKey}
              currentSurveyKey={currentSurveyKey}
              handleSetNextQuestionKey={addQuestionToSurvey}
              handleEndNextSueveyValue={setGoToQuestionOnReachingTunnel}
            />
          </>
        )
      } else if (!isEndOfSurvey) {
        return (
          <>
            <RenderQuestionText
              index={index + 1}
              question={question}
              initialValues={initialValues}
            />
            {renderValues()}
          </>
        )
      } else {
        return (
          <>
            <RenderEndOfQuestion
              text={questionText}
              isEndOfSurveyAndMoveToPreviousBreakPoint={
                isTunnelAndMoveToBreakpoint
              }
              nextQuestionKey={nextQuestionKey}
              handleGetNextQuestion={setNextSurveyKey}
            />
          </>
        )
      }
    }

    return (
      <Animatable.View
        style={{ paddingTop: 1, paddingBottom: 40 }}
        animation="fadeIn"
        useNativeDriver
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          setCurrentQuestionIndex(index)
          setHeights(index, height)
        }}
        key={index}
      >
        {renderContainers()}
      </Animatable.View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <AppLayout navigation={navigation} style={{ padding: 10 }}>
        {surveyQuestions && (
          <ScrollView ref={listViewRef} scrollToOverflowEnabled>
            {surveyQuestions &&
              surveyQuestions.map((question, index) =>
                renderAQuestion(question, index)
              )}
          </ScrollView>
        )}
      </AppLayout>
    </KeyboardAvoidingView>
  )
}

const mapStateToProps = (state) => {
  return {
    questions: questionsSelector(state),
    surveyQuestions: state.questions.surveyQuestions,
    responses: state.responses.responses,
    metaData: state.metaData.server,
  }
}

const mapDispatchToProps = {
  getQuestions,
  addQuestionToSurvey,
  setAResponse,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer)
