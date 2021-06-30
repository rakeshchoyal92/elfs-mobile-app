import React, { useState } from 'react'
import { ContentContainer } from '@screens/calendar/layout.styles'
import AddParameterScrollView from '@components/calendar/addParameterScrollView'
import AppLayout from '@components/layout'
import { SCREENS } from '@constants/strings'
import { useDispatch, useSelector, connect } from 'react-redux'
import { addParameterOfDay, updateAParameter } from '@actions/calendar.actions'
import { data } from './data'
import { Layout } from '@ui-kitten/components'

const AddParameterModal = ({
  navigation,
  route,
  selectedParameterWithValues,
}) => {
  const { date } = route.params
  const dispatch = useDispatch()
  const [loading, setLoading] = useState()

  const handleOnSubmit = (values) => {
    setLoading(true)
    const action = () =>
      selectedParameterWithValues
        ? dispatch(updateAParameter(date, values))
        : dispatch(addParameterOfDay(date, values))

    action()
      .then(() => {
        setLoading(false)
        navigation.navigate(SCREENS.CALENDAR)
      })
      .catch(() => setLoading(false))
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
          onSubmit={handleOnSubmit}
          defaultSelectedValues={selectedParameterWithValues?.values}
          loading={loading}
        />
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
    selectedParameterWithValues: calendar.selectedParameterWithValues,
  }
}

export default connect(mapStateToProps)(AddParameterModal)
