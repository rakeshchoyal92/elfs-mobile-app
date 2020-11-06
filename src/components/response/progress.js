import { COLORS } from '@constants/strings'
import React from 'react'
import { View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

export const SurveyProgress = ({ completed }) => {
  return (
    <>
      {completed >= 1 && (
        <View
          style={{
            position: 'fixed',
            bottom: 0,
            height: 40,
            backgroundColor: COLORS.PRIMARY_COLOR,
            width: '100%',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              display: 'flex',
              justifyContent: 'center',
              marginTop: 10,
              // fontWeight: 300,
            }}
          >
            {completed} completed!
          </Text>
        </View>
      )}
    </>
  )
}
