import React from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { TopBarComponent } from '@components/layout/topBar'
import { useNavigationState } from '@react-navigation/native'

export default function AppLayout({
  navigation,
  children,
  style,
  title,
  showTopBar = true,
  showDrawer = true,
}) {
  const canGoBack = useNavigationState((state) => {
    return state.routes.length > 1
  })

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View
          style={{
            flex: 1,
            // backgroundColor: COLORS.BACKGROUND_COLOR,
            ...style,
          }}
        >
          {showTopBar && (
            <TopBarComponent
              paddingTop={insets.top}
              navigation={navigation}
              title={title}
              canGoBack={canGoBack}
              showDrawer={showDrawer}
            />
          )}
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: !showTopBar ? insets.top : 10,
              paddingBottom: showTopBar && insets.bottom + 50,
              height: '100%',
            }}
          >
            {children}
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}
