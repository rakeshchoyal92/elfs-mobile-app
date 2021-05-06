import React, { useState } from 'react'
import { Button, Text } from '@ui-kitten/components'
import { setLanguage } from '@actions/misc.actions'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '@components/layout'
import { View } from 'react-native'
import { FONTS } from '@constants/strings'
import { useTranslation } from 'react-i18next'

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

const OptionPicker = ({ onClick, selectedValue }) => {
  const [selectedKey, setSelectedKey] = useState(selectedValue)

  const handleValueChange = (value) => {
    setSelectedKey(value)
    onClick(value)
  }

  return LANGUAGES.map((language) => {
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

export default function SettingsContainer({ navigation }) {
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
        />
      </View>
    </AppLayout>
  )
}
