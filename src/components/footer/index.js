import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components'
import {
  useRoute,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native'
import { COLORS } from '@constants/strings'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

const CalendarIcon = (props) => <Icon {...props} name="calendar-outline" />

const MenuIcon = (props) => <Icon {...props} name="menu-outline" />

const SettingsIcon = (props) => <Icon {...props} name="settings-outline" />

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState)
  return { selectedIndex, onSelect: setSelectedIndex }
}

export default function FooterComponent({ style }) {
  const bottomState = useBottomNavigationState()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigation = useNavigation()

  // const route = useRoute()

  // useEffect(() => {
  //   if (navigation) {
  //     console.log(route)
  //     console.log(route.name)
  //   }
  // }, [navigation])

  const handleSelect = (index) => {
    setSelectedIndex(index)
    if (index === 0) {
      navigation.navigate('calendar')
    } else if (index === 1) {
      navigation.navigate('survey')
    } else {
      navigation.navigate('setting')
    }
  }
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View
          style={{
            paddingBottom: insets.bottom,
            ...style,
          }}
        >
          <BottomNavigation
            {...bottomState}
            {...style}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
          >
            <BottomNavigationTab icon={CalendarIcon} />
            <BottomNavigationTab icon={MenuIcon} />
            <BottomNavigationTab icon={SettingsIcon} />
          </BottomNavigation>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const styles = StyleSheet.create({
  bottomNavigation: {
    // marginVertical: 8,
  },
})
