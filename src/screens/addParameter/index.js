import React from 'react'
import { ContentContainer } from '@screens/calendar/layout.styles'
import AddParameterScrollView from '@components/calendar/addParameterScrollView'
import AppLayout from '@components/layout'
import { SCREENS } from '@constants/strings'
import { useDispatch, useSelector, connect } from 'react-redux'
import { addParameterOfDay } from '@actions/calendar.actions'
import { data } from './data'
import { Layout } from '@ui-kitten/components'

const AddParameterModal = ({ navigation, route }) => {
  const { date } = route.params
  const dispatch = useDispatch()

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
    <AppLayout
      style={{ paddingLeft: 0, paddingRight: 0 }}
      showTopBar
      title={date}
      navigation={navigation}
    >
      <Layout style={{ flex: 1 }} level="4">
        {renderContent()}
      </Layout>
    </AppLayout>
  )
}

const mapStateToProps = ({ calendar }) => {
  return {
    loading: calendar.loading,
  }
}

export default connect(mapStateToProps)(AddParameterModal)
