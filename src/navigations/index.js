import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SurveyContainer from '@screens/survey'
import CalendarScreen from '@screens/calendar'
import { connect } from 'react-redux'
import { AddParameterModal } from '@screens/calendar/addParameter'
import { SCREENS } from '@constants/strings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
const CalendarStack = createStackNavigator()
const AppStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const CalendarNavigator = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name={SCREENS.CALENDAR}
        component={CalendarScreen}
        options={{
          headerShown: false,
          showIcon: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
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

const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <CalendarNavigator />
      <AppStack.Screen
        name={SCREENS.SURVEY}
        component={SurveyContainer}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  )
}

const Navigations = ({ auth }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTop: 1,
          borderTopColor: '#777',
        },
      }}
    >
      <Tab.Screen name={SCREENS.CALENDAR} component={CalendarNavigator} />
      <Tab.Screen name={SCREENS.SURVEY} component={SurveyContainer} />
      <Tab.Screen name={SCREENS.SETTINGS} component={SurveyContainer} />
    </Tab.Navigator>
  )
}

const mapStateToProps = ({ auth }) => ({
  userBio: true,
})

export default connect(mapStateToProps)(Navigations)
