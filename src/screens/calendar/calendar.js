import { FONTS } from '@constants/strings'
import { Calendar } from 'react-native-calendars'
import React, { useState } from 'react'

export default function CalendarContainer({ selectedDay, setSelectedDay }) {
  const nextDays = [
    '2020-11-01',
    '2020-11-02',
    '2020-11-03',
    '2020-11-04',
    '2020-11-05',
    '2020-11-06',
    '2020-11-07',
    '2020-11-08',
  ]

  let mark = {
    [selectedDay.dateString]: {
      selected: true,
    },
  }

  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' }
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' }
  const workout = { key: 'workout', color: 'green' }
  const workout1 = { key: 'workout1', color: 'orange' }
  const workout2 = { key: 'workout2', color: 'black' }

  nextDays.forEach((day, index) => {
    if (index === 0) {
      mark[day] = {
        dots: [vacation, massage, workout, workout1, workout2],
        // selected: true,
        // selectedColor: 'red',
      }
    } else {
      mark[day] = { dots: [massage, workout] }
    }
  })
  return (
    <Calendar
      // markedDates={selected}
      style={{ borderRadius: 10, backgroundColor: 'white' }}
      markedDates={mark}
      markingType={'multi-dot'}
      monthFormat={'MMM yyyy'}
      onDayPress={(day) => {
        setSelectedDay(day)
        // console.log('selected day', day)
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
