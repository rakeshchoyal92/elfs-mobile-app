import { FONTS } from '@constants/strings'
import { Calendar } from 'react-native-calendars'
import React from 'react'
import { connect } from 'react-redux'

function CalendarContainer({ setSelectedDay, parameters }) {
  return (
    <Calendar
      style={{ borderRadius: 10, backgroundColor: 'white' }}
      markedDates={parameters}
      markingType={'multi-dot'}
      monthFormat={'MMM yyyy'}
      onDayPress={(day) => {
        setSelectedDay(day)
      }}
      theme={{
        textDayFontFamily: FONTS.NunitoSans_600SemiBold,
        textMonthFontFamily: FONTS.NunitoSans_800ExtraBold,
        textDayHeaderFontFamily: FONTS.NunitoSans_600SemiBold,
        textDayFontSize: 14,
        calendarBackground: '#ffffff',
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
        'stylesheet.calendar.header': {
          week: {
            marginTop: 5,
            borderBottomColor: '#cdc7c7',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        },
      }}
    />
  )
}

const mapStateToProps = ({ calendar }) => {
  return {
    parameters: calendar.parameters,
    selectedParameter: calendar.selectedParameter,
  }
}

export default connect(mapStateToProps)(CalendarContainer)
