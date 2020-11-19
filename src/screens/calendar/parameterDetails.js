import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Text } from '@ui-kitten/components'

function ParameterDetail({ selectedParameter }) {
  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        minHeight: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Info on cycle length and other stats</Text>
    </View>
  )
}

const mapStateToProps = ({ calendar }) => {
  return {
    selectedParameter: calendar.selectedParameter,
  }
}
export default connect(mapStateToProps)(ParameterDetail)
