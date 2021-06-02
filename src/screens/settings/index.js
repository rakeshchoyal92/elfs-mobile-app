import React, { useState } from 'react'
import { Button, Icon, Text } from '@ui-kitten/components'
import { setLanguage } from '@actions/misc.actions'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '@components/layout'
import { ScrollView, View } from 'react-native'
import { FONTS } from '@constants/strings'
import { useTranslation } from 'react-i18next'
import { logoutUser } from '@actions/auth.actions'
import { connect } from 'react-redux'
import { LoadingIndicator } from '@components/common'

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
            selectedKey === language.key ? '#d7d2d2' : 'transparent',
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

function SettingsContainer({ navigation, logoutUser, loading }) {
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
        <View
          style={{
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#777',
          }}
        >
          <Heading text="Language" category="h4" />
          <OptionPicker
            onClick={(lang) => handleDispatchLang(lang)}
            selectedValue={selectedLang}
            values={LANGUAGES}
          />
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

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
})

const mapDispatchToState = {
  logoutUser,
}

export default connect(mapStateToProps, mapDispatchToState)(SettingsContainer)
