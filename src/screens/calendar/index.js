import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { COLORS, FONTS, SCREENS } from '@constants/strings'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CalendarContainer from '@screens/calendar/calendar'
import AppLayout from '@components/layout'

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
      <ScrollView style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 20 }}>
        <CalendarContainer
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
        />

        <Button
          style={{
            height: 50,
            backgroundColor: 'white',
            borderColor: 'white',
            marginTop: 15,
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
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
          <Text
            style={{
              color: COLORS.PRIMARY_COLOR,
              fontFamily: FONTS.NunitoSans_700Bold,
              marginLeft: 5,
            }}
          >
            Add parameter of the day
          </Text>
        </Button>
      </ScrollView>
    </AppLayout>
  )
}

export default CalendarsScreen

const styles = StyleSheet.create({
  // calendar: {
  //   marginBottom: 10,
  // },
  // text: {
  //   textAlign: 'center',
  //   padding: 10,
  //   backgroundColor: 'lightgrey',
  //   fontSize: 16,
  // },
})
