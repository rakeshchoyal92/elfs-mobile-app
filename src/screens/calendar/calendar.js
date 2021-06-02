import { FONTS } from '@constants/strings'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import React from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
}
LocaleConfig.defaultLocale = 'fr'

function CalendarContainer({ setSelectedDay, parameters, markedDate }) {
  return (
    <View>
      <Calendar
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: 'white',
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
          textDayFontSize: 12,
          calendarBackground: '#ffffff',
          textMonthFontSize: 18,
          textDayHeaderFontSize: 12,
        }}
      />
      {/*<View*/}
      {/*  style={{*/}
      {/*    height: 40,*/}
      {/*    backgroundColor: 'rgba(174,100,156,0.64)',*/}
      {/*    marginTop: 1,*/}
      {/*    borderBottomLeftRadius: 10,*/}
      {/*    borderBottomRightRadius: 10,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Text>HELLO</Text>*/}
      {/*</View>*/}
    </View>
  )
}

const mapStateToProps = ({ calendar }) => {
  return {
    parameters: calendar.parameters,
    markedDate: calendar.markedDate,
    selectedParameter: calendar.selectedParameter,
  }
}

export default connect(mapStateToProps)(CalendarContainer)
