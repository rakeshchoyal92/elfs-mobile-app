import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'

export const IconMultiplier = ({ number, font, color }) => {
  const arrayGenerator = () =>
    Array(number)
      .fill(1)
      .map((x, y) => x + y)

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {arrayGenerator().map((item) => {
        return (
          <FontAwesomeIcon
            key={item}
            icon={font}
            size={20}
            color={color}
            style={{ marginLeft: item === 1 ? 0 : -2 }}
          />
        )
      })}
    </View>
  )
}
