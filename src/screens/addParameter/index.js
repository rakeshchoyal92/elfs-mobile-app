import { View, TouchableOpacity } from 'react-native'
import { Text, TopNavigation } from '@ui-kitten/components'
import React from 'react'
import { ContentContainer } from '@screens/calendar/layout.styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import AddParameterScrollView from '@components/calendar/addParameterScrollView'
import AppLayout from '@components/layout'
import { COLORS, SCREENS } from '@constants/strings'
import { useDispatch } from 'react-redux'
import { addParameterOfDay } from '@actions/calendar.actions'
import { data } from './data'

export const AddParameterModal = ({ navigation, route }) => {
  const { date } = route.params
  const dispatch = useDispatch()

  const renderHeader = () => {
    return (
      <TopNavigation
        title={(evaProps) => <Text {...evaProps}>{date}</Text>}
        subtitle={(evaProps) => (
          <Text style={{ ...evaProps.style, color: 'black' }}>
            Parameter of the day
          </Text>
        )}
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

  const handleOnSubmit = (values) => {
    dispatch(addParameterOfDay(date, values))
    navigation.navigate(SCREENS.CALENDAR)
  }

  const renderContent = () => {
    return (
      <ContentContainer
        contentContainerStyle={{ paddingBottom: 40 }}
        extraScrollHeight={100}
        showsVerticalScrollIndicator={false}
      >
        <AddParameterScrollView data={data} onSubmit={handleOnSubmit} />
      </ContentContainer>
    )
  }

  return (
    <AppLayout style={{ paddingLeft: 0, paddingRight: 0 }} showTopBar={false}>
      <View style={{ flex: 1 }}>
        {renderHeader()}
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          {renderContent()}
        </View>
      </View>
    </AppLayout>
  )
}
