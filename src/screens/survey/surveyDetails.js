import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from '@ui-kitten/components'
import AppLayout from '@components/layout'
import { TextNunitoSans } from '@components/common'
import { FONTS } from '@constants/strings'
import { getQuestions } from '@actions/questions.actions'

const ViewIcons = (props) => <Icon name="eye-outline" {...props} />

const SurveyDetails = ({
  responses,
  navigation,
  route,
  questions,
  getQuestions,
}) => {
  const { responseId } = route.params
  const [response, setResponse] = useState([])

  useEffect(() => {
    getQuestions()
    let res = responses.find((item) => item.uuid === responseId)
    setResponse(res)
    console.log(questions)
  }, [])

  const renderResponse = (response) => {
    if (typeof response === 'boolean') {
      if (response) {
        return 'Yes'
      } else {
        return 'No'
      }
    } else {
      return response
    }
  }

  let count = 1
  return (
    <AppLayout
      navigation={navigation}
      showTopBar
      title={new Date(response.created_at).toDateString()}
    >
      <ScrollView>
        {Object.keys(questions).map((key, index) => {
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
                {Array.isArray(value) &&
                  value.map((e, index) => (
                    <TextNunitoSans
                      key={e}
                      text={`${index + 1}. ${renderResponse(e)}`}
                      fontFamily={FONTS.NunitoSans_700Bold}
                      style={{ marginBottom: 5 }}
                    />
                  ))}
                {!Array.isArray(value) && (
                  <TextNunitoSans
                    text={renderResponse(value)}
                    fontFamily={FONTS.NunitoSans_700Bold}
                  />
                )}
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
    responses: survey.responses,
    questions: questions.questionsAsDict,
  }
}

const mapDispatchToProps = {
  getQuestions,
}

export default connect(mapStateToDispatch, mapDispatchToProps)(SurveyDetails)
