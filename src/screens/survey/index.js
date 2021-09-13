import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { questionsSelector } from '@store/selectors/questions'
import { connect } from 'react-redux'
import { clearResponses, getSurveys } from '@actions/survey.actions'
import { Divider, Icon, List, ListItem, Text } from '@ui-kitten/components'
import { getUserDetails } from '@actions/misc.actions'
import AppLayout from '@components/layout'
import { TextNunitoSans } from '@components/common'
import { SCREENS } from '@constants/strings'
import { resetSurveyQuestions } from '@actions/questions.actions'
import moment from 'moment'
import { TransText } from '@components/common/TransText'

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

const SURVEY_STATUS = {
  NEEDS_UPDATE: 'NEEDS_UPDATE',
  COMPLETED: 'COMPLETED',
  INIT: 'INIT',
}

const SurveyContainer = ({
  navigation,
  surveys,
  getSurveys,
  response,
  clearResponses,
  resetSurveyQuestions,
  getUserDetails,
  userDetails,
}) => {
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      getSurveys()
    }, 1000 * 60) // in milliseconds
    return () => clearInterval(intervalId)
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSurveys()
      getUserDetails()
    })
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getSurveys().then(() => setRefreshing(false))
  }, [])

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${new Date(item.createdAt).toLocaleDateString()}`}
      description={<TimeSince value={item.createdAt} />}
      // accessoryLeft={() => <RenderRightItemAccessory {...item} />}
      style={{
        backgroundColor:
          item.status === 'COMPLETED'
            ? 'rgba(137,236,109,0.65)'
            : item.status === 'NEEDS_UPDATE'
            ? 'rgba(227,62,134,0.65)'
            : 'rgba(227,150,62,0.65)',
      }}
      onPress={() => {
        if (item.status === 'COMPLETED') {
          navigation.navigate(SCREENS.SURVEY_DETAILS, {
            surveyId: item.uuid,
            isInitialSurvey: item.surveyNumber === 1,
          })
        } else if (item.status === 'NEEDS_UPDATE') {
          resetSurveyQuestions()
          // clearResponses()
          navigation.navigate(SCREENS.SURVEY_FILL, {
            // draft: true,
            surveyId: item.uuid,
            updateResponse: true,
            isInitialSurvey: item.surveyNumber === 1,
          })
        } else {
          clearResponses()
          navigation.navigate(SCREENS.SURVEY_FILL, {
            surveyId: item.uuid,
            isInitialSurvey: item.surveyNumber === 1,
          })
        }
      }}
    />
  )

  return (
    <AppLayout navigation={navigation} showTopBar title="Survey List">
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/*{userDetails && (*/}
        {/*  <View>*/}
        {/*    {userDetails.status === 'COMPLETED' && (*/}
        {/*      <TextNunitoSans*/}
        {/*        style={{ textAlign: 'center' }}*/}
        {/*        text={`Hi, you have successfully completed surveys. Thank you`}*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  </View>*/}
        {/*)}*/}
        {surveys && surveys.length >= 1 && (
          <View>
            {surveys.find((item) => item.status === 'INIT') && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    name={'award-outline'}
                    style={{ width: 25, height: 25, marginRight: 7 }}
                    fill="orange"
                  />
                  <TransText
                    style={{ paddingVertical: 10 }}
                    translateKey={'newSurvey'}
                  />
                </View>
                <List
                  data={surveys.filter((item) => item.status === 'INIT')}
                  ItemSeparatorComponent={Divider}
                  renderItem={renderItem}
                />
              </View>
            )}

            {surveys.find((item) => item.status === 'NEEDS_UPDATE') && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <Icon
                    name={'alert-triangle-outline'}
                    style={{ width: 25, height: 25, marginRight: 7 }}
                    fill="red"
                  />
                  <TransText
                    style={{ paddingVertical: 10 }}
                    translateKey={'updateSurvey'}
                  />
                </View>

                <List
                  data={surveys.filter(
                    (item) => item.status === 'NEEDS_UPDATE'
                  )}
                  ItemSeparatorComponent={Divider}
                  renderItem={renderItem}
                />
              </View>
            )}

            {surveys.find((item) => item.status === 'COMPLETED') && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <Icon
                    name={'checkmark-square-outline'}
                    style={{ width: 25, height: 25, marginRight: 7 }}
                    fill="green"
                  />
                  <TransText
                    style={{ paddingVertical: 10 }}
                    translateKey={'completedSurveys'}
                  />
                </View>
                <List
                  data={surveys.filter((item) => item.status === 'COMPLETED')}
                  ItemSeparatorComponent={Divider}
                  renderItem={renderItem}
                />
              </View>
            )}
          </View>
          // <View>
          //   <TransText
          //     category={'h5'}
          //     style={{ paddingVertical: 10 }}
          //     translateKey={'surveys'}
          //   />
          //
          //   {surveys.map((survey) => {
          //     console.log(survey)
          //     return (
          //       <Layout
          //         level="1"
          //         key={survey.uuid}
          //         style={{
          //           height: 45,
          //           justifyContent: 'space-between',
          //           alignItems: 'center',
          //           // backgroundColor: '#ead8d8',
          //           marginVertical: 1,
          //           paddingVertical: 4,
          //           paddingHorizontal: 5,
          //           flex: 1,
          //           flexDirection: 'row',
          //           borderRadius: 10,
          //         }}
          //         contentContainerStyle={{}}
          //       >
          //         <View style={{ flexDirection: 'row' }}>
          //           <TextNunitoSans
          //             style={{ marginLeft: 10 }}
          //             text={`${new Date(
          //               survey.createdAt
          //             ).toLocaleDateString()} - `}
          //           />
          //           <TimeSince value={survey.createdAt} />
          //         </View>
          //
          //         {/*<View>*/}
          //         {/*  {survey.needs_update ? (*/}
          //         {/*    <Button*/}
          //         {/*      status={'danger'}*/}
          //         {/*      accessoryLeft={ViewIcons}*/}
          //         {/*      size={'small'}*/}
          //         {/*      onPress={() => {*/}
          //         {/*        resetSurveyQuestions()*/}
          //         {/*        overRideResponse(response)*/}
          //         {/*        console.log(response)*/}
          //         {/*        navigation.navigate(SCREENS.SURVEY_FILL, {*/}
          //         {/*          draft: true,*/}
          //         {/*          response: response,*/}
          //         {/*          updateResponse: true,*/}
          //         {/*        })*/}
          //         {/*      }}*/}
          //         {/*    >*/}
          //         {/*      Update*/}
          //         {/*    </Button>*/}
          //         {/*  ) : (*/}
          //         {/*    <Button*/}
          //         {/*      status={'info'}*/}
          //         {/*      accessoryLeft={ViewIcons}*/}
          //         {/*      size={'small'}*/}
          //         {/*      onPress={() =>*/}
          //         {/*        navigation.navigate(SCREENS.SURVEY_DETAILS, {*/}
          //         {/*          responseId: response.uuid,*/}
          //         {/*        })*/}
          //         {/*      }*/}
          //         {/*    >*/}
          //         {/*      View*/}
          //         {/*    </Button>*/}
          //         {/*  )}*/}
          //         {/*</View>*/}
          //       </Layout>
          //     )
          //   })}
          // </View>
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
    surveys: state.survey.surveys,
    userDetails: state.misc.userDetails,
  }
}

const mapDispatchToProps = {
  clearResponses,
  getSurveys,
  resetSurveyQuestions,
  getUserDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer)
