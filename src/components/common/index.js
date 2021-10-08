import { Spinner, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'

import { responsiveFontSize } from 'react-native-responsive-dimensions'

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
      // adjustsFontSizeToFit
      // allowFontScaling
      category={category || 'label'}
      style={{
        fontFamily: fontFamily,
        // fontSize: 16,
        fontSize: responsiveFontSize(2) > 16 ? 16 : responsiveFontSize(2),
        textAlign: 'left',
        // writingDirection: 'rtl',
        ...style,
      }}
    >
      {toCapitalise ? capitaliseText(text) : text}
    </Text>
  )
}

export const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size={props.size || 'small'} />
  </View>
)

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
