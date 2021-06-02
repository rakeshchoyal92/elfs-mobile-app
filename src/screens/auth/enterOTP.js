import React, { useEffect, useState } from 'react'
import AppLayout from '@components/layout'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Input, Layout } from '@ui-kitten/components'
import { LoadingIndicator, TextNunitoSans } from '@components/common'
import { SCREENS } from '@constants/strings'
import { loginUsingOTP } from '@actions/auth.actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const EnterOTPScreen = ({ navigation, route, loginUsingOTP, loading }) => {
  const { responseFromServer, emailOrMobile } = route.params
  const [OTP, setOTP] = useState()

  useEffect(() => {
    if (!responseFromServer) {
      navigation.navigate(SCREENS.AUTH_ENTER_EMAIL)
    }
  }, [])

  if (!responseFromServer) {
    return <></>
  }

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
        <View>
          <View style={{ alignItems: 'center' }}>
            <Icon
              fill="green"
              name="checkmark-outline"
              style={{ width: 150, height: 150 }}
            />
          </View>

          <Layout
            level={'4'}
            style={{
              padding: 10,
              borderRadius: 10,
              marginVertical: 30,
              alignItems: 'center',
            }}
          >
            <TextNunitoSans
              text={responseFromServer}
              style={{ textAlign: 'center' }}
            />
          </Layout>
          <View>
            <Input
              placeholder="Input your OTP"
              label="OTP"
              style={{ marginVertical: 5 }}
              onChangeText={(val) => setOTP(val)}
              value={OTP}
            />
            <Button
              disabled={loading.loginUsingOTP}
              accessoryLeft={loading.loginUsingOTP && LoadingIndicator}
              status={'info'}
              onPress={() => {
                loginUsingOTP({
                  email_or_mobile: emailOrMobile,
                  OTP: OTP,
                })
                  // .then((res) => navigation.navigate(SCREENS.CALENDAR))
                  .catch((err) => console.error('ERRRRRR', err))
              }}
            >
              LOGIN
            </Button>
          </View>
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
  loginUsingOTP,
}
export default connect(mapStateToProps, mapDispatchToProps)(EnterOTPScreen)
