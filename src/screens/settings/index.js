import React, { useEffect, useState } from 'react'
import { Button, Icon, Text } from '@ui-kitten/components'
import { setLanguage } from '@actions/misc.actions'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '@components/layout'
import { Platform, ScrollView, Switch, View } from 'react-native'
import { FONTS } from '@constants/strings'
import { useTranslation } from 'react-i18next'
import { logoutUser } from '@actions/auth.actions'
import { connect } from 'react-redux'
import { LoadingIndicator } from '@components/common'
import { setTheme } from '@actions/misc.actions'

const LANGUAGES = [
  {
    title: 'English',
    key: 'en',
  },
  {
    title: 'Hebrew',
    key: 'hr',
  },
  {
    title: 'Vietnamese',
    key: 'vt',
  },
]

const OptionPicker = ({ onClick, selectedValue, values }) => {
  const [selectedKey, setSelectedKey] = useState(selectedValue)

  const handleValueChange = (value) => {
    setSelectedKey(value)
    onClick(value)
  }

  return values.map((language) => {
    return (
      <View
        key={language.key}
        style={{
          padding: 5,
          backgroundColor:
            selectedKey === language.key ? '#ec4a4a' : 'transparent',
        }}
      >
        <Text
          onPress={() => handleValueChange(language.key)}
          style={{
            fontFamily:
              selectedKey === language.key
                ? FONTS.NunitoSans_700Bold
                : FONTS.NunitoSans_400Regular,
          }}
        >
          {language.title}
        </Text>
      </View>
    )
  })
}

const ThemeSwitcher = ({ theme }) => {
  const dispatch = useDispatch()
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (theme === 'dark') {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
  }, [theme])

  const toggleSwitch = (value) => {
    if (value) {
      dispatch(setTheme('dark'))
    } else {
      dispatch(setTheme('light'))
    }
    setIsEnabled((previousState) => !previousState)
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
      }}
    >
      <Text>Dark Theme</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

function SettingsContainer({ navigation, logoutUser, loading, theme }) {
  const dispatch = useDispatch()
  const selectedLang = useSelector(({ misc }) => misc.language)
  const { i18n } = useTranslation()

  const Heading = ({ text, category }) => {
    return (
      <Text category={category} style={{ paddingBottom: 5 }}>
        {text}
      </Text>
    )
  }

  const handleDispatchLang = (lang) => {
    i18n.changeLanguage(lang).then(() => dispatch(setLanguage(lang)))
  }

  return (
    <AppLayout navigation={navigation} showTopBar title="Settings">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      >
        <View>
          {/*<View*/}
          {/*  style={{*/}
          {/*    paddingBottom: 15,*/}
          {/*    borderBottomWidth: 1,*/}
          {/*    borderBottomColor: '#777',*/}
          {/*    marginBottom: 15,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Heading text="Language" category="h4" />*/}
          {/*  <OptionPicker*/}
          {/*    onClick={(lang) => handleDispatchLang(lang)}*/}
          {/*    selectedValue={selectedLang}*/}
          {/*    values={LANGUAGES}*/}
          {/*  />*/}
          {/*</View>*/}

          <View
            style={{
              paddingBottom: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#777',
              marginBottom: 15,
            }}
          >
            <ThemeSwitcher theme={theme} />
          </View>
        </View>

        <View
          style={{
            paddingVertical: 15,
          }}
        >
          <Button
            status={'danger'}
            onPress={logoutUser}
            disabled={loading.logoutUser}
            accessoryLeft={(props) =>
              loading.logoutUser ? (
                LoadingIndicator
              ) : (
                <Icon
                  style={{ color: 'color-primary-default', ...props.style }}
                  name={'log-out-outline'}
                />
              )
            }
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </AppLayout>
  )
}

const mapStateToProps = ({ auth, misc }) => ({
  loading: auth.loading,
  theme: misc.theme,
})

const mapDispatchToState = {
  logoutUser,
}

export default connect(mapStateToProps, mapDispatchToState)(SettingsContainer)
