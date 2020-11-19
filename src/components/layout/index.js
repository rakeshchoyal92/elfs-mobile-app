import React from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { View } from 'react-native'
import FooterComponent from '@components/footer'
import { COLORS } from '@constants/strings'

export default function AppLayout({ type, navigation, children, style }) {
  const renderFullScreen = () => {}

  const renderPaddedScreen = () => {}

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: COLORS.BACKGROUND_COLOR,
            paddingLeft: 10,
            paddingRight: 10,
            ...style,
          }}
        >
          {children}
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}
