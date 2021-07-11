import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Spinner } from '@ui-kitten/components'
import { ScrollView, View, Alert, Platform } from 'react-native'
import { FONTS, SCREENS } from '@constants/strings'
import { TextNunitoSans } from '@components/common'
import { clearResponses, submitSurvey } from '@actions/survey.actions'
import AppLayout from '@components/layout'
import { getSurveys } from '@actions/survey.actions'
import { ErrorBox } from '@components/common/Error'

const BackIcon = (props) => <Icon {...props} name="arrow-circle-left-outline" />
const DiscardIcon = (props) => <Icon {...props} name="close-outline" />
const SubmitIcon = (props) => <Icon {...props} name="checkmark-outline" />

function RenderResponse({ response }) {
  if (typeof response === 'boolean') {
    if (response) {
      return (
        <TextNunitoSans
          text="Yes"
          fontFamily={FONTS.NunitoSans_400Regular}
          style={{ marginBottom: 5 }}
        />
      )
    } else {
      return (
        <TextNunitoSans
          text="No"
          fontFamily={FONTS.NunitoSans_400Regular}
          style={{ marginBottom: 5 }}
        />
      )
    }
  } else if (Array.isArray(response)) {
    return response.map((item, index) => (
      <TextNunitoSans
        key={item}
        text={`${index + 1}. ${item}`}
        fontFamily={FONTS.NunitoSans_400Regular}
        style={{ marginBottom: 5 }}
      />
    ))
  } else if (typeof response === 'object') {
    return (
      <TextNunitoSans
        text={new Date(response).toDateString()}
        fontFamily={FONTS.NunitoSans_400Regular}
        style={{ marginBottom: 5 }}
      />
    )
  } else {
    return (
      <TextNunitoSans
        text={response}
        fontFamily={FONTS.NunitoSans_400Regular}
        style={{ marginBottom: 5 }}
      />
    )
  }
}

const SurveyReview = ({
  questions,
  response,
  getSurveys,
  submitSurvey,
  navigation,
  clearResponses,
  route,
}) => {
  const [formError, setFormError] = useState(false)
  const [formSaving, setFormSaving] = useState(false)
  const updateResponse = route?.params?.updateResponse
  const surveyId = route.params.surveyId

  const handleDiscardSurvey = () => {
    if (Platform.OS === 'web') {
      clearResponses()
      navigation.reset({ index: 0, routes: [{ name: SCREENS.SURVEY }] })
      navigation.navigate(SCREENS.SURVEY)
    }
    Alert.alert(
      'Discard survey',
      'This action is non-reversible. Are you sure you would like to discard this survey?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            clearResponses()
            navigation.reset({ index: 0, routes: [{ name: SCREENS.SURVEY }] })
            navigation.navigate(SCREENS.SURVEY)
          },
          style: 'destructive',
        },
      ]
    )
  }

  const handleReviewSubmit = () => {
    setFormSaving(true)
    submitSurvey(response, surveyId, updateResponse)
      .then(() => {
        setFormSaving(false)
        navigation.navigate(SCREENS.SURVEY)
      })
      .catch(() => {
        setFormSaving(false)
        setFormError(true)
      })
  }

  return (
    <AppLayout navigation={navigation} title={'Review responses'}>
      {/*// <View style={{ flex: 1 }}>*/}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        style={{ paddingVertical: 20, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
      >
        {response.map((res, index) => {
          return (
            <View
              key={res.key}
              className={'survey-response-div'}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: '#d4c2c2',
              }}
            >
              <TextNunitoSans
                text={`${index + 1}. ${questions[res.key]}`}
                fontFamily={FONTS.NunitoSans_700Bold}
              />
              <RenderResponse response={res.value} />
            </View>
          )
        })}
        {formError && <ErrorBox text={'couldNotSaveForm'} />}
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            justifyContent: 'space-between',
          }}
        >
          <Button
            style={{ width: '33%' }}
            onPress={() => navigation.navigate(SCREENS.SURVEY)}
            status={'info'}
            size={'small'}
            disabled={formSaving}
            accessoryLeft={BackIcon}
          >
            Amend
          </Button>

          <Button
            style={{ width: '33%' }}
            onPress={() => handleDiscardSurvey()}
            status={'danger'}
            disabled={formSaving}
            accessoryLeft={DiscardIcon}
          >
            Discard
          </Button>

          {updateResponse ? (
            <Button
              style={{ width: '33%' }}
              onPress={() => handleReviewSubmit()}
              status={'primary'}
              disabled={formSaving}
              accessoryLeft={formSaving ? Spinner : SubmitIcon}
            >
              Update
            </Button>
          ) : (
            <Button
              style={{ width: '33%' }}
              onPress={() => handleReviewSubmit()}
              status={'primary'}
              disabled={formSaving}
              accessoryLeft={formSaving ? Spinner : SubmitIcon}
            >
              Submit
            </Button>
          )}
        </View>
        {/*</View>*/}
      </ScrollView>
    </AppLayout>
  )
}

const mapStateToProps = ({ questions, survey }) => {
  return {
    questions: questions.questionsAsDict,
    response: survey.response,
    loading: survey.loading,
    error: survey.loading,
  }
}

const mapDispatchToProps = {
  submitSurvey,
  getSurveys,
  clearResponses,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyReview)
