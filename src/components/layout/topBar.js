import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import {
  TopNavigation,
  Text,
  Avatar,
  StyleService,
  useStyleSheet,
  Layout,
} from '@ui-kitten/components'
import { MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { FONTS, SCREENS } from '@constants/strings'

export const TopBarComponent = ({
  navigation,
  title,
  canGoBack = false,
  paddingTop,
}) => {
  /**
   * Redux
   */

  const renderLeftAccessory = (props) => {
    return canGoBack ? (
      <TouchableOpacity>
        <Text>
          <MaterialIcons
            {...props}
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={26}
          />
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <Text>
          <MaterialIcons
            {...props}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: SCREENS.CALENDAR }],
              })
            }
            name="home"
            size={26}
          />
        </Text>
      </TouchableOpacity>
    )
  }

  const styles = useStyleSheet(themedStyles)
  return (
    <Layout>
      <TopNavigation
        style={[styles.container, { paddingTop: paddingTop }]}
        title={(props) => (
          <Text
            {...props}
            style={[styles.titleText, { paddingTop: paddingTop }]}
          >
            {title}
          </Text>
        )}
        alignment={'center'}
        accessoryLeft={renderLeftAccessory}
      />
    </Layout>
  )
}

const themedStyles = StyleService.create({
  container: {
    // borderBottomWidth: 1,
    backgroundColor: 'background-basic-color-4',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontfamily: FONTS.NunitoSans_800ExtraBold,
  },
  logo: {
    // width: 30,
    // height: 30,
  },
})
