import React, { useEffect, useState, useRef } from 'react'
import { View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import { questionsSelector } from '@store/selectors/questions'
import { connect, useSelector } from 'react-redux'
import { addQuestionToSurvey, getQuestions } from '@actions/questions.actions'
import {
  RESPONSE_TYPES,
  SCREENS,
  VARIABLE_MATCHING_STRATEGY,
  VALUES_SELECTED,
  TUNNEL,
} from '@constants/strings'
import {
  getASurvey,
  getMetaData,
  setASurveyResponse,
} from '@actions/survey.actions'
import {
  RenderBoolean,
  RenderCheckbox,
  RenderDate,
  RenderEndOfQuestion,
  RenderLabel,
  RenderNumberInput,
  RenderQuestionText,
  RenderRadio,
  RenderTextAreaInput,
  RenderTextInput,
} from '@components/response'
import { setMetaData } from '@actions/metaData.actions'
import { Button } from '@ui-kitten/components'
import * as Animatable from 'react-native-animatable'
import AppLayout from '@components/layout'
import { LoadingIndicator, TextNunitoSans } from '@components/common'
import { ErrorBoundary } from 'react-error-boundary'
import { isNumeric } from '@utils/misc'
import { useHeaderHeight } from '@react-navigation/stack'

const TESTING = false

const RenderQuestion = React.memo(
  ({
    question,
    handleGetNextQuestion,
    initialValues,
    setASurveyResponse,
    index,
    setCurrentQuestionIndex,
    setHeights,
    navigation,
    updateResponse,
    surveyId,
    metaData,
  }) => {
    const { responseType, questionText, isEndOfSurvey } = question

    const responseProps = {
      question,
      handleGetNextQuestion,
      initialValues,
      setASurveyResponse,
      onInitialValueGoToAutoNext: true,
      metaData,
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
        key={question.key}
      >
        {isEndOfSurvey && (
          <View>
            <RenderEndOfQuestion text={questionText} />
            <Button
              status={'info'}
              onPress={() =>
                navigation.navigate(SCREENS.SURVEY_REVIEW, {
                  updateResponse,
                  surveyId,
                })
              }
            >
              Review Responses
            </Button>
          </View>
        )}

        {!isEndOfSurvey && (
          <RenderQuestionText
            index={index + 1}
            question={question}
            metaData={metaData}
            initialValues={initialValues}
          />
        )}
        {responseType === RESPONSE_TYPES.BOOLEAN && (
          <RenderBoolean {...responseProps} />
        )}
        {responseType === RESPONSE_TYPES.RADIO && (
          <RenderRadio {...responseProps} />
        )}
        {responseType === RESPONSE_TYPES.TEXT && (
          <RenderTextInput {...responseProps} />
        )}
        {responseType === RESPONSE_TYPES.TEXTAREA && (
          <RenderTextAreaInput {...responseProps} />
        )}
        {responseType === RESPONSE_TYPES.NUMBER && (
          <RenderNumberInput {...responseProps} />
        )}
        {responseType === RESPONSE_TYPES.LABEL && (
          <RenderLabel {...responseProps} />
        )}
        {responseType === RESPONSE_TYPES.CHECKBOX && (
          <RenderCheckbox {...responseProps} />
        )}
        {responseType === RESPONSE_TYPES.DATE && (
          <RenderDate {...responseProps} />
        )}
      </Animatable.View>
    )
  },
  (prevProps, nextProps) => prevProps.question.key === nextProps.question.key
)

const SurveyFill = (props) => {
  const {
    questions,
    getQuestions,
    surveyQuestions,
    addQuestionToSurvey,
    setASurveyResponse,
    response,
    // metaData,
    navigation,
    route,
    getASurvey,
    responseDict,
    responseFromServer,
    getMetaData,
    // metaData,
    // initialValues = props.route?.params?.draft ? props.responseDict : {},
    updateResponse = props.route?.params?.updateResponse,
    isInitialSurvey = props.route?.params?.isInitialSurvey,
    amendResponse = props.route?.params?.amendResponse,
    // initialValues = props.responseDict ? props.responseDict : {},
  } = props

  const headerHeight = useHeaderHeight()
  console.log({ headerHeight })
  const { surveyId } = route.params
  const [nextSurveyKey, setNextSurveyKey] = useState()
  const [tunnelInfo, setTunnelInfo] = useState()
  const [viewHeights, setViewHeights] = useState([-10])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState()
  const listViewRef = useRef()
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [fetchingMetaData, setFetchingMetaData] = useState(true)
  const [initialValues, setInitialValue] = useState({})
  const [metaData, setMetaData] = useState()
  let lastResponse = {}

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initialise()
    })

    return unsubscribe
  }, [navigation])

  function initialise() {
    setFetchingMetaData(true)

    getQuestions(isInitialSurvey)
      .then(() => getMetaData(surveyId))
      .then((res) => {
        const { value } = res
        setMetaData(value)
        setFetchingMetaData(false)
      })
      .catch(() => setFetchingMetaData(false))

    if (updateResponse) {
      setLoadingResponse(true)
      getASurvey(surveyId)
        .then((res) => {
          setInitialValue(res.value.surveyResponse)
          setLoadingResponse(false)
        })
        .catch(() => setLoadingResponse(false))
    }
  }

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
      if (amendResponse || updateResponse) {
      } else listViewRef.current.scrollTo({ y: newOffset, animate: false })
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
      //If the user update response
      if (index < viewHeights.length) {
        let newViewHeights = viewHeights.slice(0, index + 1)
        setViewHeights(newViewHeights)
      } else {
        setViewHeights((prev) => [...prev, height])
      }
    }
  }

  const getTunnelInfo = (tunnelKey) =>
    questions.find((q) => q.key === tunnelKey)

  // let responseFlat = response.reduce((acc, response) => {
  //   const { key, value } = response
  //   acc[key] = value
  //   return acc
  // }, {})

  const handleTunnelRouting = (key, type) => {
    let currentTunnelInfo = getTunnelInfo(key)
    if (type === TUNNEL.ENTER) {
      const { startQ } = currentTunnelInfo
      let nextQ = startQ
      if (nextQ.startsWith('c_')) {
        nextQ = evaluateCondition(nextQ)
      }
      setTunnelInfo(currentTunnelInfo)
      return nextQ
    } else {
      if (tunnelInfo.onEnd.startsWith(TUNNEL.STARTS)) {
        let newTunnelInfo = getTunnelInfo(tunnelInfo.onEnd)
        setTunnelInfo(newTunnelInfo)
        return newTunnelInfo.startQ
      } else {
        setTunnelInfo(tunnelInfo)
        return tunnelInfo.onEnd
      }
    }
  }
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
      const { extractValueFrom, matchingStrategy, onValue, variable } =
        condition

      if (extractValueFrom) {
        let valueObtainedFromServerSurvey

        //FIXME: First check the current survey followed by metadata from the server
        // surveyValue holds value of survey response. Last response is since last
        // question response is not updated at responseDict at this point
        const surveyValues = {
          ...lastResponse,
          ...responseDict,
        }

        if (surveyValues.hasOwnProperty(variable)) {
          valueObtainedFromServerSurvey = surveyValues[variable]
        } else {
          valueObtainedFromServerSurvey = metaData[variable]
        }
        // console.log('Evaluate', variable, valueObtainedFromServerSurvey)
        // response: state.survey.response,

        switch (matchingStrategy) {
          case VARIABLE_MATCHING_STRATEGY.NULL_NOTNULL: {
            if (onValue === VALUES_SELECTED.NULL) {
              return valueObtainedFromServerSurvey === null
            }
            return valueObtainedFromServerSurvey !== null
          }

          case VARIABLE_MATCHING_STRATEGY.NOT_EQUAL: {
            return valueObtainedFromServerSurvey !== onValue
          }

          case VARIABLE_MATCHING_STRATEGY.TRUE_FALSE: {
            if (onValue === VALUES_SELECTED.FALSE) {
              return valueObtainedFromServerSurvey === false
            }
            return valueObtainedFromServerSurvey === true
          }

          case VARIABLE_MATCHING_STRATEGY.EQUAL: {
            if (isNumeric(onValue)) {
              return valueObtainedFromServerSurvey === Number(onValue)
            } else {
              return valueObtainedFromServerSurvey === onValue
            }
          }

          case VARIABLE_MATCHING_STRATEGY.GREATER: {
            return valueObtainedFromServerSurvey >= Number(onValue)
          }

          case VARIABLE_MATCHING_STRATEGY.LESSER: {
            return valueObtainedFromServerSurvey <= Number(onValue)
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
        let goToOnTrue = conditionalNext.goToOnTrue
        if (nextQuestionKey.startsWith('c_')) {
          return evaluateCondition(nextQuestionKey)
        } else if (goToOnTrue === TUNNEL.RETURN) {
          return handleTunnelRouting(goToOnTrue, TUNNEL.EXIT)
        } else if (goToOnTrue.startsWith(TUNNEL.STARTS)) {
          return handleTunnelRouting(goToOnTrue, TUNNEL.ENTER)
        } else {
          return nextQuestionKey
        }
      } else {
        let nextQuestionKey = conditionalNext.goToOnFalse
        let goToOnFalse = conditionalNext.goToOnFalse
        if (nextQuestionKey.startsWith('c_')) {
          return evaluateCondition(nextQuestionKey)
        } else if (goToOnFalse === TUNNEL.RETURN) {
          return handleTunnelRouting(goToOnFalse, TUNNEL.EXIT)
        } else if (goToOnFalse.startsWith(TUNNEL.STARTS)) {
          return handleTunnelRouting(goToOnFalse, TUNNEL.ENTER)
          // return currentTunnel.startQ
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
        } else if (goToOnTrue === TUNNEL.RETURN) {
          return handleTunnelRouting(goToOnTrue, TUNNEL.EXIT)
        } else if (goToOnTrue.startsWith(TUNNEL.STARTS)) {
          return handleTunnelRouting(goToOnTrue, TUNNEL.ENTER)
        } else {
          return goToOnTrue
        }
      } else {
        if (goToOnFalse.startsWith('c_')) {
          return evaluateCondition(goToOnFalse)
        } else if (goToOnFalse === TUNNEL.RETURN) {
          return handleTunnelRouting(goToOnFalse, TUNNEL.EXIT)
        } else if (goToOnFalse.startsWith(TUNNEL.STARTS)) {
          return handleTunnelRouting(goToOnFalse, TUNNEL.ENTER)
        } else {
          return goToOnFalse
        }
      }
    }
  }

  const handleGetNextQuestion = async (question, valueSelected) => {
    const { nextQuestions, key } = question
    let nextQuestionKey = null

    if (
      valueSelected === VALUES_SELECTED.ANY &&
      question.responseType === RESPONSE_TYPES.LABEL
    ) {
      valueSelected = true
    }

    // Store response in redux
    setASurveyResponse(key, valueSelected)
    lastResponse = {
      [key]: valueSelected,
    }

    if (typeof valueSelected === 'boolean') {
      if (valueSelected) {
        valueSelected = VALUES_SELECTED.TRUE
      } else {
        valueSelected = VALUES_SELECTED.FALSE
      }
    }

    if (valueSelected === VALUES_SELECTED.SKIP) {
      valueSelected = VALUES_SELECTED.ANY
    }

    if (valueSelected)
      nextQuestions.map((nq) => {
        let goTo = nq.goTo

        // Check for onValue. If absent it should mean go to next question on
        // any value. Eg., user input on text, dates, numbers
        let valueS = nextQuestions.find((nq) => nq.onValue === valueSelected)
        if (!valueS) {
          valueSelected = VALUES_SELECTED.ANY
        }

        if (nq.onValue === valueSelected) {
          let isNextCondition = goTo.startsWith('c_')
          let isReturnToTunnel = goTo === TUNNEL.RETURN
          if (isReturnToTunnel) {
            nextQuestionKey = tunnelInfo.onEnd
            let isNextTunnel = nextQuestionKey.startsWith(TUNNEL.STARTS)
            if (isNextTunnel) {
              let newTunnelInfo = getTunnelInfo(nextQuestionKey)
              nextQuestionKey = newTunnelInfo.startQ
              setTunnelInfo(newTunnelInfo)
            } else {
              nextQuestionKey = tunnelInfo.onEnd
            }
          } else if (goTo.startsWith(TUNNEL.STARTS)) {
            let newTunnelInfo = getTunnelInfo(goTo)
            nextQuestionKey = newTunnelInfo.startQ
            setTunnelInfo(newTunnelInfo)
          } else if (isNextCondition) {
            if (TESTING) {
              addQuestionToSurvey(key, goTo)
              return null
            } else {
              nextQuestionKey = evaluateCondition(goTo)
            }
            //
          } else {
            nextQuestionKey = goTo
          }
        }
      })

    if (nextQuestionKey) {
      setNextSurveyKey(nextQuestionKey)
      addQuestionToSurvey(key, nextQuestionKey)
    }
  }

  const handleConditionResponse = (currentKey, goTo) => {
    if (goTo.startsWith(TUNNEL.STARTS)) {
      goTo = handleTunnelRouting(goTo, TUNNEL.ENTER)
    } else if (goTo === TUNNEL.RETURN) {
      goTo = handleTunnelRouting(goTo, TUNNEL.EXIT)
    }
    addQuestionToSurvey(currentKey, goTo)
    setNextSurveyKey(goTo)
  }

  const questionProps = {
    handleGetNextQuestion,
    initialValues: updateResponse ? initialValues : responseDict,
    setASurveyResponse,
    onInitialValueGoToAutoNext: true,
    setCurrentQuestionIndex,
    setHeights,
    navigation,
    updateResponse: updateResponse || amendResponse,
    surveyId,
    metaData,
  }

  return (
    <AppLayout
      navigation={navigation}
      title={
        route?.params?.amendResponse || route?.params.updateResponse
          ? 'Update Survey'
          : 'New Survey'
      }
    >
      {loadingResponse && <LoadingIndicator />}
      {fetchingMetaData && <LoadingIndicator />}
      {surveyQuestions?.length >= 1 &&
        metaData &&
        !loadingResponse &&
        !fetchingMetaData && (
          <ScrollView
            style={{ paddingVertical: 20 }}
            ref={listViewRef}
            scrollToOverflowEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 150 }}
          >
            {surveyQuestions.map((question, index) => {
              return (
                <RenderQuestion
                  key={question.key}
                  {...questionProps}
                  index={index}
                  question={question}
                />
              )
            })}
          </ScrollView>
        )}
    </AppLayout>
  )
}

const mapStateToProps = (state) => {
  return {
    questions: questionsSelector(state),
    surveyQuestions: state.questions.surveyQuestions,
    response: state.survey.response,
    responseDict: state.survey.response_dict,
    responseFromServer: state.survey.selectedSurvey?.surveyResponse,
    metaData: state.metaData.server,
  }
}

const mapDispatchToProps = {
  getQuestions,
  addQuestionToSurvey,
  setASurveyResponse,
  setMetaData,
  getASurvey,
  getMetaData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyFill)
