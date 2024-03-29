import React, { Fragment, useEffect } from 'react'
import configureStore from '@store'
import { Provider } from 'react-redux'
import {
  StyleSheet,
  I18nManager as RNI18nManager,
  Platform,
  LogBox,
  View,
} from 'react-native'
import Navigations from '@navigations'
import { NavigationContainer } from '@react-navigation/native'
import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
  Text,
  Button,
} from '@ui-kitten/components'
import useCachedResources from '@src/hooks/useCachedResources'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_100Thin,
  Roboto_700Bold,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto'
import * as Updates from 'expo-updates'
import { PersistGate } from 'redux-persist/integration/react'
import styled from 'styled-components/native'
import {
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic,
} from '@expo-google-fonts/nunito-sans'
import { default as customTheme } from '@themes/custom-theme.json'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import './lang/i18n'
import { StatusBar } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation'
import { TextNunitoSans } from '@components/common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ErrorBoundary from 'react-native-error-boundary'

if (Platform.OS !== 'web') {
  LogBox.ignoreAllLogs() //Ignore all log notifications
}

const store = configureStore()

const CustomFallback = ({ error, resetError }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      margin: 10,
    }}
  >
    <TextNunitoSans
      text="Error! Please contact admin"
      style={{ paddingVertical: 10, color: 'black' }}
    />
    <TextNunitoSans
      style={{ paddingVertical: 10, color: 'black' }}
      text={error.toString()}
    />
    <Button onPress={resetError} status={'danger'}>
      Retry
    </Button>
  </View>
)

const LayoutWrapper = () => {
  const theme = useSelector(({ misc }) => misc.theme)
  if (Platform.OS === 'web') {
    return (
      <Fragment>
        <WebLayout>
          <Navigations />
        </WebLayout>
      </Fragment>
    )
  } else {
    return (
      <Layout style={[styles.containerCustom]}>
        <Navigations />
      </Layout>
    )
  }
}

const AppWrapper = () => {
  const language = useSelector(({ misc }) => misc.language)
  const theme = useSelector(({ misc }) => misc.theme)

  useEffect(() => {
    const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR'

    if (language === 'hr' && RNDir === 'LTR') {
      RNI18nManager.forceRTL(true)
      if (Platform.OS !== 'web') {
        Updates.reloadAsync()
      }
    }

    if (language === 'en' && RNDir === 'RTL') {
      RNI18nManager.forceRTL(false)
      if (Platform.OS !== 'web') {
        Updates.reloadAsync()
      }
    }
  }, [language])

  return (
    <ApplicationProvider {...eva} theme={{ ...eva[theme], ...customTheme }}>
      <SafeAreaProvider>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <NavigationContainer linking={{ enabled: true }}>
            <LayoutWrapper />
          </NavigationContainer>
        </ErrorBoundary>
      </SafeAreaProvider>
    </ApplicationProvider>
  )
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_100Thin,
    Roboto_700Bold,
    Roboto_500Medium,
    NunitoSans_200ExtraLight,
    NunitoSans_200ExtraLight_Italic,
    NunitoSans_300Light,
    NunitoSans_300Light_Italic,
    NunitoSans_400Regular,
    NunitoSans_400Regular_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_700Bold,
    NunitoSans_700Bold_Italic,
    NunitoSans_800ExtraBold,
    NunitoSans_800ExtraBold_Italic,
    NunitoSans_900Black,
    NunitoSans_900Black_Italic,
  })

  if (!isLoadingComplete || !fontsLoaded) {
    return null
  } else {
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <AppWrapper />
        </PersistGate>
      </Provider>
    )
  }
}

const WebLayout = styled.View`
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: center;
  align-self: center;
  width: 100%;
  //background-color: white;
  position: relative;
  //margin: 40px auto;
  overflow: scroll;
  // width: ${(props) => props.width};
  // height: ${(props) => props.height};
  //border-radius: 40px;
  //border-color: black;
  //border-width: 10px;
  //shadow-opacity: 0.75;
  //shadow-radius: 20px;
  //shadow-color: #777;
  //shadow-offset: 0px 0px;
  //padding-top: 10px;
  //background: black;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCustom: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
})
