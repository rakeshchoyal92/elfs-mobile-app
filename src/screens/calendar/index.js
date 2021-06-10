import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Button, Layout, Text } from '@ui-kitten/components'
import { FONTS, SCREENS } from '@constants/strings'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CalendarContainer from '@screens/calendar/calendar'
import AppLayout from '@components/layout'
import ParameterDetail from '@screens/calendar/parameterDetails'
import { TransText } from '@components/common/TransText'
import { connect } from 'react-redux'
import moment from 'moment'

import { setSelectedDayInCalendar } from '@actions/calendar.actions'
import { TextNunitoSans } from '@components/common'

const CalendarsScreen = ({
  navigation,
  setSelectedDayInCalendar,
  selectedParameterWithValues,
}) => {
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [selectedDay, setSelectedDay] = useState(today)

  const handleSelectedDay = (day) => {
    setSelectedDayInCalendar(day.dateString)
    setSelectedDay(day)
  }

  return (
    <AppLayout navigation={navigation} showTopBar={true} title={'Calendar'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*<TransText*/}
        {/*  translateKey={'calendar'}*/}
        {/*  category={'h4'}*/}
        {/*  style={{ marginBottom: 10 }}*/}
        {/*/>*/}

        <CalendarContainer
          setSelectedDay={handleSelectedDay}
          selectedDay={selectedDay}
        />

        <Layout
          level={'2'}
          style={{
            paddingHorizontal: 10,
            flex: 1,
            flexDirection: 'row',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          {/*Bleeding*/}
          <View
            style={{
              flexBasis: '30%',
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 25,
                backgroundColor: 'red',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>01</Text>
            </View>
            <TextNunitoSans text={'Bleeding'} style={{ fontSize: 14 }} />
          </View>

          {/*Period Pain*/}
          <View
            style={{
              flexBasis: '30%',
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 15,
                backgroundColor: 'orange',
                marginRight: 10,
              }}
            />
            <TextNunitoSans text={'Period pain'} style={{ fontSize: 14 }} />
          </View>

          {/*Pelvic Pain*/}
          <View
            style={{
              flexBasis: '30%',
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 15,
                backgroundColor: 'black',
                marginRight: 10,
              }}
            />
            <TextNunitoSans text={'Pelvic pain'} style={{ fontSize: 14 }} />
          </View>
        </Layout>

        <Button
          style={styles.button}
          disabled={!selectedDay}
          onPress={() =>
            selectedDay &&
            navigation.navigate(SCREENS.ADD_PARAMETER, {
              date: selectedDay.dateString
                ? selectedDay.dateString
                : selectedDay,
            })
          }
          accessoryLeft={() => (
            <MaterialCommunityIcons
              name="database-plus"
              size={24}
              color="white"
            />
          )}
        >
          <TransText
            style={styles.buttonText}
            translateKey={'addParameterOfDay'}
          />
        </Button>

        {selectedParameterWithValues && (
          <ParameterDetail data={selectedParameterWithValues} />
        )}
      </ScrollView>
    </AppLayout>
  )
}

const mapStateToProps = ({ calendar }) => {
  return {
    selectedParameterWithValues: calendar.selectedParameterWithValues,
  }
}

const mapDispatchToProps = {
  setSelectedDayInCalendar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarsScreen)

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#dd6868',
    borderColor: '#dd6868',
    marginTop: 15,
    borderRadius: 10,
    flex: 1,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    // color: COLORS.PRIMARY_COLOR,
    color: 'white',
    fontFamily: FONTS.NunitoSans_700Bold,
    marginLeft: 5,
  },
})
