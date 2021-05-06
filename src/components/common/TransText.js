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

  return (
    <Text
      category={category || 'label'}
      style={{
        fontFamily: fontFamily,
        fontSize: 16,
        ...style,
      }}
    >
      {t(translateKey)}
    </Text>
  )
}
