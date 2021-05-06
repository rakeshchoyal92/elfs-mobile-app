import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { COLORS, FONTS, SCREENS } from '@constants/strings'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CalendarContainer from '@screens/calendar/calendar'
import AppLayout from '@components/layout'
import ParameterDetail from '@screens/calendar/parameterDetails'
import { TransText } from '@components/common/TransText'
import translateJson from '../../../locales/en/translation.json'

const CalendarsScreen = ({ navigation }) => {
  const today = new Date()

  const [selectedDay, setSelectedDay] = useState(
    today.toLocaleDateString('en-GB', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
  )

  return (
    <AppLayout navigation={navigation}>
      <ScrollView>
        <CalendarContainer
          setSelectedDay={setSelectedDay}
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
              color="red"
            />
          )}
        >
          <React.Suspense fallback={<Text>loading....</Text>}>
            <TransText
              style={styles.buttonText}
              translateKey={'addParameterOfDay'}
            />
          </React.Suspense>
        </Button>

        <ParameterDetail />
      </ScrollView>
    </AppLayout>
  )
}

export default CalendarsScreen

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: 'white',
    borderColor: 'white',
    marginTop: 15,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: COLORS.PRIMARY_COLOR,
    fontFamily: FONTS.NunitoSans_700Bold,
    marginLeft: 5,
  },
})
