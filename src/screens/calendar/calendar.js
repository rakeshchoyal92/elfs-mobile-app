import { FONTS } from '@constants/strings'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

function CalendarContainer({ setSelectedDay, parameters, markedDate, theme }) {
  return (
    <View>
      <Calendar
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: theme === 'dark' ? 'black' : 'white',
        }}
        markedDates={{ ...parameters, ...markedDate }}
        markingType={'multi-dot'}
        monthFormat={'MMM yyyy'}
        onDayPress={(day) => {
          setSelectedDay(day)
        }}
        theme={{
          textDayFontFamily: FONTS.NunitoSans_400Regular,
          textMonthFontFamily: FONTS.NunitoSans_400Regular,
          textDayHeaderFontFamily: FONTS.NunitoSans_400Regular,
          todayTextColor: 'red',
          textDayFontSize: 14,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          // These color change based on the theme
          calendarBackground: theme === 'dark' ? 'black' : 'white',
          monthTextColor: theme === 'dark' ? 'white' : 'black',
          dayTextColor: theme === 'dark' ? 'white' : 'black',
          textDisabledColor: '#858a8d',
        }}
      />
    </View>
  )
}

const mapStateToProps = ({ calendar, misc }) => {
  return {
    parameters: calendar.parameters,
    markedDate: calendar.markedDate,
    selectedParameter: calendar.selectedParameter,
    theme: misc.theme,
  }
}

export default connect(mapStateToProps)(CalendarContainer)
