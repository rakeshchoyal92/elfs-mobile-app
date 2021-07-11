import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from '@ui-kitten/components'
import AppLayout from '@components/layout'
import { LoadingIndicator, TextNunitoSans } from '@components/common'
import { FONTS } from '@constants/strings'
import { getQuestions } from '@actions/questions.actions'
import moment from 'moment'
import { getASurvey } from '@actions/survey.actions'

const ViewIcons = (props) => <Icon name="eye-outline" {...props} />

const SurveyDetails = ({
  response,
  navigation,
  route,
  questions,
  getQuestions,
  getASurvey,
  surveyLoadings,
}) => {
  const { surveyId, isInitialSurvey } = route.params
  // const [response, setResponse] = useState()
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)

  useEffect(() => {
    // getQuestions().then(() => getASurvey(surveyId))
    getASurvey(surveyId).then((res) => {
      return getQuestions(isInitialSurvey)
    })
  }, [])

  function RenderResponse({ response }) {
    const isDate = moment(response, 'YYYY-MM-DD', true).isValid()
    if (typeof response === 'boolean') {
      if (response) {
        return (
          <TextNunitoSans
            text="Yes"
            fontFamily={FONTS.NunitoSans_700Bold}
            style={{ marginBottom: 5 }}
          />
        )
      } else {
        return (
          <TextNunitoSans
            text="No"
            fontFamily={FONTS.NunitoSans_700Bold}
            style={{ marginBottom: 5 }}
          />
        )
      }
    } else if (Array.isArray(response)) {
      return response.map((item, index) => (
        <TextNunitoSans
          key={item}
          text={`${index + 1}. ${item}`}
          fontFamily={FONTS.NunitoSans_700Bold}
          style={{ marginBottom: 5 }}
        />
      ))
    } else if (isDate) {
      return (
        <TextNunitoSans
          text={moment(response, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          fontFamily={FONTS.NunitoSans_700Bold}
          style={{ marginBottom: 5 }}
        />
      )
    } else {
      return (
        <TextNunitoSans
          text={response}
          fontFamily={FONTS.NunitoSans_700Bold}
          style={{ marginBottom: 5 }}
        />
      )
    }
  }

  let count = 1
  return (
    <AppLayout
      navigation={navigation}
      showTopBar
      title={response ? new Date(response?.created_at).toDateString() : ''}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {surveyLoadings.fetchingSurvey && <LoadingIndicator size={'large'} />}
        {response &&
          !surveyLoadings.fetchingSurvey &&
          Object.keys(questions).map((key, index) => {
            const value = response[key]
            if (![null, undefined].includes(value) && questions[key]) {
              return (
                <View
                  key={key}
                  className={'survey-response-div'}
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomStyle: 'solid',
                    borderBottomColor: '#d4c2c2',
                  }}
                >
                  <TextNunitoSans
                    text={`${count++}. ${questions[key]}`}
                    fontFamily={FONTS.NunitoSans_600SemiBold}
                    adjustsFontSizeToFit
                    allowFontScaling
                  />
                  <RenderResponse response={value} />
                </View>
              )
            }
          })}
      </ScrollView>
    </AppLayout>
  )
}

const mapStateToDispatch = ({ survey, questions }) => {
  return {
    questions: questions.questionsAsDict,
    response: survey.selectedSurvey?.surveyResponse,
    surveyLoadings: survey.loading,
  }
}

const mapDispatchToProps = {
  getQuestions,
  getASurvey,
}

export default connect(mapStateToDispatch, mapDispatchToProps)(SurveyDetails)
