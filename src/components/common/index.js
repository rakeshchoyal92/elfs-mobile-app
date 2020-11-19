import { Text } from '@ui-kitten/components'
import React from 'react'

export function TextNunitoSans({
  text,
  style,
  fontFamily = 'NunitoSans_600SemiBold',
  toCapitalise = false,
  category,
}) {
  const capitaliseText = (value) =>
    value[0].toUpperCase() + value.slice(1).replace(/_/g, ' ').toLowerCase()

  return (
    <Text
      category={category || 'label'}
      style={{
        fontFamily: fontFamily,
        fontSize: 16,
        ...style,
      }}
    >
      {toCapitalise ? capitaliseText(text) : text}
    </Text>
  )
}
