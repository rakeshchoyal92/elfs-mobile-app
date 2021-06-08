import React from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { Platform, ScrollView, View } from 'react-native'
import { TopBarComponent } from '@components/layout/topBar'
import { useNavigationState } from '@react-navigation/native'
import { Layout } from '@ui-kitten/components'

export default function AppLayout({
  navigation,
  children,
  style,
  title,
  showTopBar = true,
}) {
  const canGoBack = useNavigationState((state) => {
    return state.routes.length > 1
  })

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Layout
          level={'4'}
          style={{
            flex: 1,
            ...style,
          }}
        >
          {showTopBar && (
            <TopBarComponent
              paddingTop={insets.top}
              navigation={navigation}
              title={title}
              canGoBack={canGoBack}
            />
          )}

          {Platform.OS === 'web' ? (
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: !showTopBar ? insets.top : 10,
                paddingBottom: showTopBar && insets.bottom + 50,
                height: '100%',
                alignItems: 'center',
              }}
            >
              <ScrollView style={{ width: 800 }}>{children}</ScrollView>
            </View>
          ) : (
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: !showTopBar ? insets.top : 10,
                paddingBottom: showTopBar && insets.bottom + 50,
                height: '100%',
                // alignItems: Platform.OS === 'web' && 'center',
              }}
            >
              {children}
            </View>
          )}
        </Layout>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}
