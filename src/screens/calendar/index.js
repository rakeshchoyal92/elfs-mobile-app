import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { COLORS, FONTS, SCREENS } from '@constants/strings'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CalendarContainer from '@screens/calendar/calendar'
import AppLayout from '@components/layout'
import ParameterDetail from '@screens/calendar/parameterDetails'
import { TransText } from '@components/common/TransText'
import { connect } from 'react-redux'

import translateJson from '../../../locales/en/translation.json'
import { setSelectedDayInCalendar } from '@actions/calendar.actions'

const CalendarsScreen = ({ navigation, setSelectedDayInCalendar }) => {
  const today = new Date()
  const [selectedDay, setSelectedDay] = useState(
    today.toLocaleDateString('en-AU', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
  )

  const handleSelectedDay = (day) => {
    setSelectedDayInCalendar(day.dateString)
    setSelectedDay(day)
  }

  return (
    <AppLayout
      navigation={navigation}
      showTopBar={false}
      // title={new Date(today).toDateString()}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TransText
          translateKey={'calendar'}
          category={'h4'}
          style={{ marginBottom: 10 }}
        />
        <CalendarContainer
          setSelectedDay={handleSelectedDay}
          selectedDay={selectedDay}
        />
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

        <ParameterDetail />
      </ScrollView>
    </AppLayout>
  )
}

const mapDispatchToProps = {
  setSelectedDayInCalendar,
}

export default connect(null, mapDispatchToProps)(CalendarsScreen)

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#dd6868',
    borderColor: 'white',
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
