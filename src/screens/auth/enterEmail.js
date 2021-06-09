import React, { useState } from 'react'
import AppLayout from '@components/layout'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Input, Layout } from '@ui-kitten/components'
import { LoadingIndicator, TextNunitoSans } from '@components/common'
import { generatePassword } from '@actions/auth.actions'
import { SCREENS } from '@constants/strings'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const EnterEmailScreen = ({ generatePassword, navigation, loading }) => {
  const [email, setEmail] = useState()
  const [responseFromServer, setResponseFromServer] = useState(null)

  return (
    <AppLayout navigation={navigation} title="Login">
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        style={{
          flex: 1,
          paddingTop: 50,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Icon
            fill="green"
            name="log-in-outline"
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View>
          <Input
            placeholder="Type your Email or Mobile No."
            value={email}
            label="Email ID or Mobile No"
            // disabled={responseFromServer}
            style={{ marginVertical: 15 }}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
          <Button
            // disabled={responseFromServer}
            label="OTP"
            onPress={() => {
              generatePassword(email)
                .then((res) => {
                  setResponseFromServer(res.value.message)
                  navigation.navigate(SCREENS.AUTH_ENTER_OTP, {
                    responseFromServer: res.value.message,
                    //FIXME: REMOVE OTP ON PROD
                    OTP: res.value.OTP,
                    emailOrMobile: email,
                  })
                })
                .catch((err) => setResponseFromServer(null))
            }}
            disabled={loading.generatePassword}
            accessoryLeft={loading.generatePassword && LoadingIndicator}
          >
            SUBMIT
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </AppLayout>
  )
}

const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.loading,
  }
}

const mapDispatchToProps = {
  generatePassword,
}
export default connect(mapStateToProps, mapDispatchToProps)(EnterEmailScreen)
