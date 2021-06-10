import { FONTS } from '@constants/strings'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

function CalendarContainer({
  setSelectedDay,
  parameters,
  markedDateFormatted,
  theme,
}) {
  return (
    <View>
      <Calendar
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: 'rgba(150,213,241,100)',
        }}
        markedDates={{ ...parameters, ...markedDateFormatted }}
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
          calendarBackground: 'rgba(176,224,245,0.76)',
          monthTextColor: 'black',
          dayTextColor: 'black',
          textDisabledColor: '#858a8d',
          textSectionTitleColor: 'black',
        }}
      />
    </View>
  )
}

const mapStateToProps = ({ calendar, misc }) => {
  return {
    parameters: calendar.parameters,
    markedDateFormatted: calendar.markedDateFormatted,
    selectedParameterWithValues: calendar.selectedParameterWithValues,
    theme: misc.theme,
  }
}

export default connect(mapStateToProps)(CalendarContainer)
