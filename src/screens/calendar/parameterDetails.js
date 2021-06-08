import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

function ParameterDetail({ selectedParameter }) {
  return (
    <Layout
      level={'2'}
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        marginTop: 15,
        minHeight: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Info on cycle length and other stats</Text>
    </Layout>
  )
}

const mapStateToProps = ({ calendar }) => {
  return {
    selectedParameter: calendar.selectedParameter,
  }
}
export default connect(mapStateToProps)(ParameterDetail)
