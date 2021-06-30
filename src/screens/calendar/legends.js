import { View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { TextNunitoSans } from '@components/common'
import React from 'react'

export const CalendarLegends = () => {
  return (
    <Layout
      level={'2'}
      style={{
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        // borderWidth: 1,
        // borderColor: 'orange',
        borderTopWidth: 0,
      }}
    >
      {/*Bleeding*/}
      <View
        style={{
          flexBasis: '30%',
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 25,
            backgroundColor: 'red',
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>01</Text>
        </View>
        <TextNunitoSans text={'Bleeding'} style={{ fontSize: 14 }} />
      </View>

      {/*Period Pain*/}
      <View
        style={{
          flexBasis: '30%',
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 15,
            backgroundColor: 'orange',
            marginRight: 10,
          }}
        />
        <TextNunitoSans text={'Period pain'} style={{ fontSize: 14 }} />
      </View>

      {/*Pelvic Pain*/}
      <View
        style={{
          flexBasis: '30%',
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 15,
            backgroundColor: 'black',
            marginRight: 10,
          }}
        />
        <TextNunitoSans text={'Pelvic pain'} style={{ fontSize: 14 }} />
      </View>
    </Layout>
  )
}
