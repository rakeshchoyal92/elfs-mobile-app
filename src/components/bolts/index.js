import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const Bolts = ({ number, color }) => {
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
            icon={faBolt}
            size={15}
            color={color}
            style={{ marginLeft: item === 1 ? 0 : -5 }}
          />
        )
      })}
    </View>
  )
}
