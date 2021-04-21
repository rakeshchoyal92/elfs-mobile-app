import React from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { ScrollView, View } from 'react-native'
import FooterComponent from '@components/footer'
import { COLORS } from '@constants/strings'
import { Layout } from '@ui-kitten/components'
import { TopBarComponent } from '@components/layout/topBar'
import { useNavigationState } from '@react-navigation/native'

export default function AppLayout({
  type,
  navigation,
  children,
  style,
  title,
  showTopBar = true,
  showDrawer = true,
}) {
  const renderFullScreen = () => {}

  const renderPaddedScreen = () => {}

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
              paddingTop: 10,
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
