import React, { useEffect, useState } from 'react'
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

import {
  getParameterOfTheDay,
  setSelectedDayInCalendar,
} from '@actions/calendar.actions'
import { CalendarLegends } from '@screens/calendar/legends'

const CalendarsScreen = ({
  navigation,
  setSelectedDayInCalendar,
  selectedParameterWithValues,
  getParameterOfTheDay,
}) => {
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [selectedDay, setSelectedDay] = useState(today)

  useEffect(() => {
    getParameterOfTheDay()
  }, [])

  const handleSelectedDay = (day) => {
    setSelectedDayInCalendar(day.dateString)
    setSelectedDay(day)
  }

  return (
    <AppLayout navigation={navigation} showTopBar={true} title={'Calendar'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/*<TransText*/}
        {/*  translateKey={'calendar'}*/}
        {/*  category={'h4'}*/}
        {/*  style={{ marginBottom: 10 }}*/}
        {/*/>*/}

        <CalendarContainer
          setSelectedDay={handleSelectedDay}
          selectedDay={selectedDay}
        />
        <CalendarLegends />

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
            translateKey={
              selectedParameterWithValues
                ? 'updateParameterOfDay'
                : 'addParameterOfDay'
            }
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
  getParameterOfTheDay,
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
