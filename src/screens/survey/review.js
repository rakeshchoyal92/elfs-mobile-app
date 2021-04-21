import React, { useState } from 'react'
import { connect } from 'react-redux'
// import { Typography, Button } from 'antd'
import {
  Button,
  ButtonGroup,
  Icon,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components'
import { ScrollView, View, Alert } from 'react-native'
import { FONTS, SCREENS } from '@constants/strings'
import { TextNunitoSans } from '@components/common'
import styled from 'styled-components/native'
import { submitSurvey } from '@actions/survey.actions'
import { RenderEndOfQuestion } from '@components/response'
import AppLayout from '@components/layout'
// const { Title } = Typography

const BackIcon = (props) => <Icon {...props} name="arrow-circle-left-outline" />
const DiscardIcon = (props) => <Icon {...props} name="close-outline" />
const SubmitIcon = (props) => <Icon {...props} name="checkmark-outline" />

function RenderResponse({ response }) {
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
    response.map((item, index) => (
      <TextNunitoSans
        key={item}
        text={`${index + 1}. ${item}`}
        fontFamily={FONTS.NunitoSans_700Bold}
        style={{ marginBottom: 5 }}
      />
    ))
  } else if (typeof response === 'object') {
    return (
      <TextNunitoSans
        text={new Date(response).toDateString()}
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
  console.log('asdadasda', response)
  return null
}

const SurveyReview = ({
  questions,
  response,
  onReviewSubmit,
  loading,
  submitSurvey,
  route,
  navigation,
}) => {
  const { savingResponse } = loading
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleDiscardSurvey = () => {
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
          onPress: () => console.log('OK pressed'),
          style: 'destructive',
        },
      ]
    )
  }

  const handleReviewSubmit = () => {
    submitSurvey(response)
      .then(() => setFormSubmitted(true))
      .catch(() => console.error('asdas'))
  }

  return (
    <AppLayout navigation={navigation} title={'Review responses'}>
      {/*// <View style={{ flex: 1 }}>*/}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        style={{ paddingVertical: 20, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
      >
        {response.map((response, index) => {
          return (
            <View
              key={response.key}
              className={'survey-response-div'}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: '#d4c2c2',
              }}
            >
              <TextNunitoSans
                text={`${index + 1}. ${questions[response.key]}`}
                fontFamily={FONTS.NunitoSans_600SemiBold}
                adjustsFontSizeToFit
                allowFontScaling
              />
              <RenderResponse response={response.value} />
              {/*{Array.isArray(response.value) &&*/}
              {/*  response.value.map((item, index) => (*/}
              {/*    <TextNunitoSans*/}
              {/*      key={item}*/}
              {/*      text={`${index + 1}. ${renderResponse(item)}`}*/}
              {/*      fontFamily={FONTS.NunitoSans_700Bold}*/}
              {/*      style={{ marginBottom: 5 }}*/}
              {/*    />*/}
              {/*  ))}*/}
              {/*{!Array.isArray(response.value) && (*/}
              {/*  <TextNunitoSans*/}
              {/*    text={renderResponse(response.value)}*/}
              {/*    fontFamily={FONTS.NunitoSans_700Bold}*/}
              {/*  />*/}
              {/*)}*/}
            </View>
          )
        })}
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
            disabled={savingResponse}
            accessoryLeft={BackIcon}
          >
            Amend
          </Button>

          <Button
            style={{ width: '33%' }}
            onPress={() => handleDiscardSurvey()}
            status={'danger'}
            disabled={savingResponse}
            accessoryLeft={DiscardIcon}
          >
            Discard
          </Button>

          <Button
            style={{ width: '33%' }}
            onPress={() => handleReviewSubmit()}
            status={'primary'}
            disabled={savingResponse}
            accessoryLeft={loading.savingResponse ? Spinner : SubmitIcon}
          >
            Submit
          </Button>
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
  }
}

const mapDispatchToProps = {
  submitSurvey,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyReview)
