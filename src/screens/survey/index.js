import React, { useEffect, useState, useRef } from 'react'
import {
  SafeAreaView,
  View,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native'
import { questionsSelector } from '@store/selectors/questions'
import { connect } from 'react-redux'
import { addQuestionToSurvey, getQuestions } from '@actions/questions'
import { COLORS, NO_LOGIC, RESPONSE_TYPES } from '@constants/strings'
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
} from '@components/response'
import { Layout } from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import AppLayout from '@components/layout'

const initialValues = {}

// const initialValues = {
//   DATE_COMPLETED: '11-11-2020',
//   WEIGHT_CHANGE_SINCE_LAST_STUDY: 'No',
//   MEDICATION_CHANGE_SINCE_LAST_STUDY: 'No',
//   RELATIONSHIP_CHANGE_SINCE_LAST_STUDY: 'No',
//   SURGICAL_HISTORY_SINCE_LAST_STUDY: 'No',
//   CURRENTLY_PREGNANT: 'No',
//   SEXUAL_ACTIVITY: 'I have been actively trying to get pregnant',
//   PREGNANCY_ATTEMPT_METHOD:
//     'I have been undergoing IVF (thaw cycle with frozen embryo transfer)',
//   IVF_EGG_SOURCE: 'DONOR',
//   IVF_SPERM_SOURCE: 'DONOR',
//   IVF_EMBRYO_TRANSFER_COUNT: '12',
//   TEST_TUBAL_PATENCY: 'No',
//   SEMEN_ANALYSIS_PERFORMED: 'Not-Applicable',
// }

const SurveyContainer = (props) => {
  const {
    getQuestions,
    surveyQuestions,
    addQuestionToSurvey,
    setAResponse,
    responses,
    metaData,
    navigation,
  } = props

  const [currentSurveyKey, setCurrentSurveyKey] = useState()
  const [nextSurveyKey, setNextSurveyKey] = useState()
  const [viewHeights, setViewHeights] = useState([-100])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState()
  const listViewRef = useRef()

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

  const handleGetNextQuestion = (question, valueSelected) => {
    const { nextQuestions, key } = question
    let nextQuestion
    let nextQuestionKey

    /**
     * Get next question ket when decision on a meta data has to be performed.
     * @param nextQuestion
     * @returns {*}
     */

    const getNextQuestionKeyBasedOnMetaData = (nextQuestion) => {
      const { source, key, nextQuestions } = nextQuestion.decisionOnMetadata
      let metaDataValue
      if (source === 'SERVER') {
        metaDataValue = metaData[key]
      } else {
        metaDataValue = responseFlat[key]

        //FIXME: Hardcoded metaDataValue as No when the response is not recorded
        // Scenario: METADATA PARTICIPANT_COMPLETE_LAST_CYCLE IS YES AND
        // CURRENTLY_PREGNANT IS NO THEN PREGNANT_DURING_CYCLE KEY & VALUE IS
        // NOT SET
        if (!metaDataValue) {
          metaDataValue = 'No'
        }
      }
      nextQuestion = nextQuestions.find((q) => q.onValue === metaDataValue)
      return nextQuestion.key
    }

    if (valueSelected) {
      setAResponse(key, valueSelected)
    }

    // If next question has to be decided on no logic.
    // There is only one item in array and onValue should be equal to NO_LOGIC
    const isNextQuestionAuto =
      nextQuestions.length === 1 && nextQuestions[0].onValue === NO_LOGIC

    if (isNextQuestionAuto) {
      nextQuestion = nextQuestions.find((q) => q.onValue === NO_LOGIC)
      // If the decision depends on the metadata
      if (nextQuestion.decisionOnMetadata) {
        nextQuestionKey = getNextQuestionKeyBasedOnMetaData(nextQuestion)
      } else {
        nextQuestionKey = nextQuestion.key
      }
    } else {
      nextQuestion = nextQuestions.find((q) => q.onValue === valueSelected)
      /**
       * Logic to get next questions based on decision made with the
       * meta data value
       *
       */
      if (nextQuestion.decisionOnMetadata) {
        nextQuestionKey = getNextQuestionKeyBasedOnMetaData(nextQuestion)
      } else {
        nextQuestionKey = nextQuestion.key
      }
    }
    setCurrentSurveyKey(question.key)
    setNextSurveyKey(nextQuestionKey)
    addQuestionToSurvey(question.key, nextQuestionKey)
  }

  const renderAQuestion = (question, index) => {
    const { responseType, questionText, isEndOfSurvey } = question
    const props = {
      question,
      handleGetNextQuestion,
      initialValues,
    }

    const renderValues = () => {
      switch (responseType) {
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

    return (
      <Animatable.View
        style={{ paddingTop: 5 }}
        animation="fadeIn"
        useNativeDriver
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          setCurrentQuestionIndex(index)
          setHeights(index, height)
        }}
        key={index}
      >
        {!isEndOfSurvey ? (
          <Layout
            level="2"
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <RenderQuestionText text={questionText} index={index + 1} />
            {renderValues()}
          </Layout>
        ) : (
          <>
            <RenderEndOfQuestion text={questionText} />
          </>
        )}
      </Animatable.View>
    )
  }

  return (
    <AppLayout navigation={navigation}>
      {surveyQuestions && (
        <ScrollView ref={listViewRef} scrollToOverflowEnabled>
          {surveyQuestions &&
            surveyQuestions.map((question, index) =>
              renderAQuestion(question, index)
            )}
        </ScrollView>
      )}
    </AppLayout>
    // <SurveyProgress completed={responses.length} />
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
