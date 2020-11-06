import React from 'react'
import configureStore from '@store'
import { Provider } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import Navigations from '@navigations'
import { NavigationContainer } from '@react-navigation/native'
import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
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
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FooterComponent from '@components/footer'

const store = configureStore()

const AppWrapper = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Layout style={[styles.containerCustom]}>
            <Navigations />
            {/*<FooterComponent />*/}
          </Layout>
        </NavigationContainer>
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
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <AppWrapper />
      </Provider>
    )
  }
}

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
    backgroundColor: 'white',
  },
})
