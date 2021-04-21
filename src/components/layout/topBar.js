import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  TopNavigation,
  Text,
  Avatar,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components'
import { MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

export const TopBarComponent = ({
  navigation,
  title,
  canGoBack = false,
  showDrawer = true,
  paddingTop,
}) => {
  /**
   * Redux
   */
  const width = useSelector(({ misc }) => misc.width)
  const styles = useStyleSheet(themedStyles)
  return (
    <TopNavigation
      style={[
        styles.container,
        { paddingTop: paddingTop, backgroundColor: 'wheat' },
      ]}
      title={(props) => (
        <Text {...props} style={[styles.titleText, { paddingTop: paddingTop }]}>
          {title}
        </Text>
      )}
      alignment={'center'}
      accessoryLeft={(props) =>
        canGoBack ? (
          <Text>
            <MaterialIcons
              // style={{ marginRight: -200 }}
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={26}
            />
          </Text>
        ) : (
          <TouchableOpacity
          // onPress={() => navigation.navigate(INTERVENTION_ROUTES.HOME)}
          >
            <Avatar
              style={styles.logo}
              // source={require('@assets/images/bb_logo.png')}
            />
          </TouchableOpacity>
        )
      }
    />
  )
}

const themedStyles = StyleService.create({
  container: {
    borderBottomColor: 'color-primary-300',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 30,
    height: 30,
  },
})
