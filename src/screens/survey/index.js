import React, { useEffect, useState, useRef } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { questionsSelector } from '@store/selectors/questions'
import { connect } from 'react-redux'
import { clearResponses, getAllSurveys } from '@actions/survey.actions'
import { Button, Icon, Layout, Spinner, Text } from '@ui-kitten/components'
import AppLayout from '@components/layout'
import { TextNunitoSans } from '@components/common'
import { SCREENS } from '@constants/strings'
import { CLEAR_RESPONSES } from '@store/action-types'
import { resetSurveyQuestions } from '@actions/questions.actions'
import moment from 'moment'
import { TransText } from '@components/common/TransText'
import ReRenderer from '@components/reRenderer'

const ViewIcons = (props) => <Icon name="eye-outline" {...props} />
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const TimeSince = ({ value }) => {
  const [timeSince, setTimeSince] = useState(moment(value).fromNow())
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(moment(value).fromNow())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return <TextNunitoSans text={timeSince} />
}

const SurveyContainer = ({
  navigation,
  getAllSurveys,
  responses,
  response,
  clearResponses,
  resetSurveyQuestions,
}) => {
  useEffect(() => {
    getAllSurveys()
  }, [getAllSurveys])

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(false)
    getAllSurveys().then(() => setRefreshing(false))
  }, [])

  return (
    <AppLayout navigation={navigation} showTopBar title="Survey List">
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {response && response.length >= 1 && (
          <View>
            <Text
              category={'h6'}
              style={{ paddingVertical: 10, textAlign: 'center' }}
            >
              You have a incomplete survey. Click on 'Complete Draft Survey' to
              complete.
            </Text>
            <Button
              onPress={() => {
                resetSurveyQuestions()
                navigation.navigate(SCREENS.SURVEY_FILL, {
                  draft: true,
                })
              }}
              status={'danger'}
              style={{ marginBottom: 25 }}
            >
              Complete Draft Survey
            </Button>
            <Text category={'h5'} style={{ textAlign: 'center' }}>
              OR
            </Text>
          </View>
        )}

        <View style={{ paddingVertical: 20 }}>
          <Button
            status={'info'}
            onPress={() => {
              clearResponses()
              navigation.navigate(SCREENS.SURVEY_FILL)
            }}
            accessoryLeft={(props) => <Icon {...props} name="plus-outline" />}
          >
            Add a New Survey
          </Button>
        </View>

        {responses && responses.length >= 1 && (
          <View>
            <TransText
              category={'h5'}
              style={{ paddingVertical: 10 }}
              translateKey={'completedSurveys'}
            />

            {responses.map((response) => {
              return (
                <Layout
                  level="1"
                  key={response.uuid}
                  style={{
                    height: 45,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // backgroundColor: '#ead8d8',
                    marginVertical: 1,
                    paddingVertical: 4,
                    paddingHorizontal: 5,
                    flex: 1,
                    flexDirection: 'row',
                    borderRadius: 10,
                  }}
                  contentContainerStyle={{}}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <TextNunitoSans
                      style={{ marginLeft: 10 }}
                      text={`${new Date(
                        response.created_at
                      ).toLocaleDateString()} - `}
                    />
                    <ReRenderer interval={1000}>
                      <TimeSince value={response.created_at} />
                    </ReRenderer>
                  </View>

                  <View style={{ width: 70 }}>
                    <Button
                      status={'info'}
                      accessoryLeft={ViewIcons}
                      size={'small'}
                      onPress={() =>
                        navigation.navigate(SCREENS.SURVEY_DETAILS, {
                          responseId: response.uuid,
                        })
                      }
                    >
                      View
                    </Button>
                  </View>
                </Layout>
              )
            })}
          </View>
        )}
      </ScrollView>
    </AppLayout>
  )
}

const mapStateToProps = (state) => {
  return {
    questions: questionsSelector(state),
    surveyQuestions: state.questions.surveyQuestions,
    metaData: state.metaData.server,
    responses: state.survey.responses,
    response: state.survey.response,
  }
}

const mapDispatchToProps = {
  clearResponses,
  getAllSurveys,
  resetSurveyQuestions,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer)
