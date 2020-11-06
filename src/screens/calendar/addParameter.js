import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  // Modal,
} from 'react-native'
import { Button, Input, Text, TopNavigation } from '@ui-kitten/components'
import React from 'react'
import {
  ContentContainer,
  FooterContainer,
} from '@screens/calendar/layout.styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import AddParameterScrollView from '@components/calendar/addParameterScrollView'
import AppLayout from '@components/layout'
import { COLORS, SCREENS } from '@constants/strings'

export const AddParameterModal = ({ navigation, route }) => {
  const { date } = route.params

  const data = [
    {
      title: 'Bleeding',
      type: 'checkbox',
      key: 'bleeding',
      data: [
        { key: 'Spot', icon: 'anger' },
        { key: 'Light', icon: 'anger' },
        { key: 'Normal', icon: 'anger' },
        { key: 'Heavy', icon: 'anger' },
      ],
    },
    {
      type: 'checkbox',
      title: 'Period Pain',
      key: 'periodPain',
      data: [
        { key: 'None', icon: 'blush' },
        { key: 'Mild', icon: 'unamused' },
        { key: 'Moderate', icon: 'angry' },
        { key: 'Severe', icon: 'cry' },
      ],
    },
    {
      title: 'Had Sex',
      key: 'hadSex',
      type: 'radio',
      data: [{ key: 'Yes', icon: 'heart' }],
    },
    {
      title: 'Experienced sex with pain',
      key: 'experiencedSexWithPain',
      type: 'radio',
      data: [{ key: 'Yes', icon: 'disappointed' }],
    },
    {
      title: 'Pelvic Pain',
      key: 'pelvicPain',
      type: 'radio',
      data: [{ key: 'Yes', icon: 'disappointed' }],
    },
    {
      title: 'Note',
      key: 'note',
      type: 'textbox',
    },
  ]

  const renderHeader = () => {
    return (
      <TopNavigation
        title={(evaProps) => <Text {...evaProps}>{date}</Text>}
        subtitle={(evaProps) => <Text {...evaProps}>Parameter of the day</Text>}
        accessoryLeft={() => (
          <MaterialCommunityIcons
            name="database-plus"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        )}
        accessoryRight={() => (
          <TouchableOpacity
            style={{ width: 50, alignItems: 'center' }}
            onPress={() => navigation.navigate(SCREENS.CALENDAR)}
          >
            <Ionicons name="ios-close-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        )}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#c3bfbf',
          backgroundColor: COLORS.BACKGROUND_COLOR,
        }}
      />
    )
  }

  const renderContent = () => {
    return (
      <ContentContainer
        contentContainerStyle={{ paddingBottom: 40 }}
        extraScrollHeight={100}
        showsVerticalScrollIndicator={false}
      >
        <AddParameterScrollView
          data={data}
          onSubmit={(value) => console.log('on submit!', value)}
        />
      </ContentContainer>
    )
  }

  const renderFooter = () => {
    return (
      <FooterContainer>
        <Button>Save</Button>
      </FooterContainer>
    )
  }
  return (
    <AppLayout>
      <View style={{ flex: 1 }}>
        {renderHeader()}
        {renderContent()}
        {/*{renderFooter()}*/}
      </View>
    </AppLayout>
  )
}
