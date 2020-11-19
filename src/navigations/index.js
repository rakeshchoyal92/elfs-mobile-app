import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SurveyContainer from '@screens/survey'
import CalendarScreen from '@screens/calendar'
import { connect } from 'react-redux'
import { AddParameterModal } from '@screens/addParameter'
import { SCREENS } from '@constants/strings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SettingsContainer from '@screens/settings'
const CalendarStack = createStackNavigator()
const Tab = createBottomTabNavigator()
import { AntDesign } from '@expo/vector-icons'

const CalendarNavigator = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name={SCREENS.CALENDAR}
        component={CalendarScreen}
        options={{
          headerShown: false,
          showIcon: true,
        }}
      />
      <CalendarStack.Screen
        name={SCREENS.ADD_PARAMETER}
        component={AddParameterModal}
        options={{ headerShown: false }}
      />
    </CalendarStack.Navigator>
  )
}

const Navigations = ({ auth }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === SCREENS.CALENDAR) {
            iconName = 'calendar'
          } else if (route.name === SCREENS.SURVEY) {
            iconName = 'profile'
          } else if (route.name === SCREENS.SETTINGS) {
            iconName = 'setting'
          }

          return <AntDesign name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        borderTop: 1,
        borderTopColor: '#777',
      }}
    >
      <Tab.Screen name={SCREENS.CALENDAR} component={CalendarNavigator} />
      <Tab.Screen name={SCREENS.SURVEY} component={SurveyContainer} />
      <Tab.Screen name={SCREENS.SETTINGS} component={SettingsContainer} />
    </Tab.Navigator>
  )
}

const mapStateToProps = ({ auth }) => ({
  userBio: true,
})

export default connect(mapStateToProps)(Navigations)
