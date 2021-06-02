import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { TransText } from '@components/common/TransText'
import React from 'react'

export const ErrorBox = ({ text }) => {
  return (
    <View
      style={{
        backgroundColor: '#eea5b0',
        paddingVertical: 20,
        paddingHorizontal: 5,
        marginVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
      }}
    >
      <FontAwesomeIcon icon={faExclamationTriangle} size={40} color={'red'} />
      <TransText style={{ textAlign: 'center' }} translateKey={text} />
    </View>
  )
}
