import React from 'react'
import { Text } from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'

export function TransText({
  style,
  fontFamily = 'NunitoSans_600SemiBold',
  category,
  translateKey,
}) {
  const { t, i18n } = useTranslation()
  const translatedText = t(translateKey)

  if (category) {
    return (
      <Text
        style={{
          fontFamily: fontFamily,
          ...style,
        }}
        category={'h4'}
      >
        {translatedText}
      </Text>
    )
  }

  return (
    <Text
      style={{
        fontFamily: fontFamily,
        fontSize: 16,
        ...style,
      }}
      category={'label'}
    >
      {translatedText}
    </Text>
  )
}
