import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CalendarScreen from '@screens/calendar'
import { connect } from 'react-redux'
import AddParameterModal from '@screens/addParameter'
import { SCREENS } from '@constants/strings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SettingsContainer from '@screens/settings'
import SurveyContainer from '@screens/survey'
import SurveyReview from '@screens/survey/review'
import SurveyFill from '@screens/survey/survey_fill'
const CalendarStack = createStackNavigator()
const SurveyStack = createStackNavigator()
const Tab = createBottomTabNavigator()
import { AntDesign } from '@expo/vector-icons'
import SurveyDetails from '@screens/survey/surveyDetails'
import EnterEmailScreen from '@screens/auth/enterEmail'
import EnterOTPScreen from '@screens/auth/enterOTP'

const AuthStack = createStackNavigator()

const CalendarNavigator = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name={SCREENS.CALENDAR}
        component={CalendarScreen}
        options={{
          headerShown: false,
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

const SurveyNavigator = () => {
  return (
    <SurveyStack.Navigator>
      <CalendarStack.Screen
        name={SCREENS.SURVEY}
        component={SurveyContainer}
        options={{ headerShown: false, showIcon: true }}
      />
      <CalendarStack.Screen
        name={SCREENS.SURVEY_FILL}
        component={SurveyFill}
        options={{ headerShown: false, showIcon: true }}
      />
      <SurveyStack.Screen
        name={SCREENS.SURVEY_REVIEW}
        component={SurveyReview}
        options={{
          headerShown: false,
          showIcon: true,
        }}
      />
      <SurveyStack.Screen
        name={SCREENS.SURVEY_DETAILS}
        component={SurveyDetails}
        options={{
          headerShown: false,
          showIcon: true,
        }}
      />
    </SurveyStack.Navigator>
  )
}

const Navigations = ({ userBio, theme }) => {
  const tabBarOptions =
    theme === 'dark'
      ? {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          borderTop: 1,
          borderTopColor: '#777',
          activeBackgroundColor: 'black',
          inactiveBackgroundColor: 'black',
          style: {
            backgroundColor: 'black',
          },
        }
      : {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          borderTop: 1,
          borderTopColor: '#777',
          activeBackgroundColor: 'white',
          inactiveBackgroundColor: 'white',
          style: {
            backgroundColor: 'white',
          },
        }

  const Stack = createStackNavigator()
  const Navigation = () =>
    !userBio ? (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name={SCREENS.AUTH_ENTER_EMAIL}
          component={EnterEmailScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name={SCREENS.AUTH_ENTER_OTP}
          component={EnterOTPScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    ) : (
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
        tabBarOptions={tabBarOptions}
      >
        <Tab.Screen name={SCREENS.CALENDAR} component={CalendarNavigator} />
        <Tab.Screen name={SCREENS.SURVEY} component={SurveyNavigator} />
        <Tab.Screen name={SCREENS.SETTINGS} component={SettingsContainer} />
      </Tab.Navigator>
    )

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'mobile'} component={Navigation} />
    </Stack.Navigator>
  )
}

const mapStateToProps = ({ auth, misc }) => ({
  userBio: auth.bio,
  theme: misc.theme,
})

export default connect(mapStateToProps)(Navigations)
