import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CalendarScreen from '@screens/calendar'
import { connect, useDispatch } from 'react-redux'
import { AddParameterModal } from '@screens/addParameter'
import { SCREENS } from '@constants/strings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SettingsContainer from '@screens/settings'
import SurveyContainer from '@screens/survey'
import SurveyReview from '@screens/survey/review'
import SurveyFill from '@screens/survey/survey_fill'

const Tab = createBottomTabNavigator()
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import SurveyDetails from '@screens/survey/surveyDetails'
import EnterEmailScreen from '@screens/auth/enterEmail'
import EnterOTPScreen from '@screens/auth/enterOTP'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View } from 'react-native'
import {
  Button,
  Drawer,
  DrawerItem,
  Icon,
  IndexPath,
  Layout,
  Text,
} from '@ui-kitten/components'
import { map } from 'lodash'
import { RenderIcon } from '@components/Icons'

const DrawerNavigator = createDrawerNavigator()
const AuthStack = createStackNavigator()

const CalendarStack = createStackNavigator()
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

const SurveyStack = createStackNavigator()
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

const Stack = createStackNavigator()
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  )
}

const DrawerContent = ({ navigation, state }) => {
  /**
   * Redux
   */
  const dispatch = useDispatch()
  // const themeOptions = useSelector(({ theme }) => theme.options)
  // const isDarkTheme = useSelector(({ theme }) => theme.isDarkTheme)
  // const currentTheme = useSelector(({ theme }) => theme.current)
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))

  return (
    <Layout style={{ flex: 1 }}>
      <DrawerItem
        key="Menu"
        accessoryLeft={(props) => (
          <View style={{ paddingLeft: 10 }}>
            <MaterialIcons
              name="menu"
              size={20}
              color={props.style.tintColor}
            />
          </View>
        )}
        title={<Text style={{ fontSize: 16 }}> MENU </Text>}
      />

      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        {map(state.routes, 'name').map((routeName) => (
          <DrawerItem
            accessoryLeft={(props) => (
              <View style={{ paddingLeft: 10 }}>
                <RenderIcon {...props} name={routeName} />
              </View>
            )}
            key={routeName}
            title={<Text>{routeName.replace(/_/g, ' ').toUpperCase()}</Text>}
          />
        ))}
      </Drawer>
    </Layout>
  )
}

const Navigations = ({ userBio }) => {
  return !userBio ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={SCREENS.AUTH} component={AuthNavigator} />
    </Stack.Navigator>
  ) : (
    <DrawerNavigator.Navigator
      drawerPosition={'left'}
      drawerType={'permanent'}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerNavigator.Screen
        name={SCREENS.CALENDAR}
        component={CalendarNavigator}
      />
      <DrawerNavigator.Screen
        name={SCREENS.SURVEY}
        component={SurveyNavigator}
      />
      <DrawerNavigator.Screen
        name={SCREENS.SETTINGS}
        component={SettingsContainer}
      />
    </DrawerNavigator.Navigator>
  )
}

const mapStateToProps = ({ auth }) => ({
  userBio: auth.bio,
})

export default connect(mapStateToProps)(Navigations)
