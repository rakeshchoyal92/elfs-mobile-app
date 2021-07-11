import React from 'react'
import { connect } from 'react-redux'
import { Platform, View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { data as paramData } from '@screens/addParameter/data'
import { IconMultiplier } from '@components/Icons/fa-icon-multiplier'
import { TextNunitoSans } from '@components/common'
import { COLORS, FONTS } from '@constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function ParameterDetail({ data }) {
  const extractParamInfo = (key, response) => {
    console.log({ key, response })
    const item = paramData.find((item) => item.key === key)
    const { title, shortTitle, color, data = [] } = item
    let responseVal = data.find((item) => item.key === response)
    return {
      title,
      shortTitle,
      color,
      data: responseVal,
    }
  }

  const renderView = () => {
    if (data) {
      const { date, values } = data
      return (
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          {Object.keys(values).map((item) => {
            if (
              ![undefined, null].includes(values[item]) &&
              paramData.find((e) => e.key === item) &&
              values[item]
            ) {
              if (item !== 'notes') {
                const {
                  title,
                  shortTitle = null,
                  data,
                  color = 'grey',
                } = extractParamInfo(item, values[item])
                // console.log({ data })
                return (
                  <Layout
                    level={'4'}
                    key={title}
                    style={{
                      flex: 1,
                      flexBasis: '30%',
                      height: Platform.OS === 'web' ? 70 : 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 5,
                      borderRadius: 10,
                      backgroundColor: COLORS.BACKGROUND_PINK_1,
                    }}
                  >
                    <View>
                      <TextNunitoSans
                        fontFamily={FONTS.NunitoSans_600SemiBold}
                        text={shortTitle || title}
                        style={{ color: 'black' }}
                      />

                      <View
                        style={{
                          marginTop: 3,
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {data?.type === 'multipleIcon' && (
                          <IconMultiplier
                            number={data.number}
                            font={data.font}
                            color={data.color}
                          />
                        )}

                        {data?.type === 'twoIcons' && (
                          <View>
                            <Text>A</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </Layout>
                )
              } else {
                return (
                  <Layout
                    key={'notes'}
                    style={{
                      flex: 1,
                      flexBasis: '70%',
                      margin: 5,
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: COLORS.BACKGROUND_PINK_1,
                    }}
                    level={'4'}
                  >
                    <TextNunitoSans
                      text={'Notes:'}
                      fontFamily={FONTS.NunitoSans_800ExtraBold}
                      style={{ color: 'black' }}
                    />
                    <TextNunitoSans
                      text={values['notes']}
                      style={{ color: 'black' }}
                    />
                  </Layout>
                )
              }
            }
          })}
        </View>
      )
    }
    return null
  }
  return (
    <Layout
      level={'4'}
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        marginTop: 15,
        // minHeight: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {renderView()}
    </Layout>
  )
}

const mapStateToProps = ({ calendar }) => {
  return {
    selectedParameter: calendar.selectedParameter,
  }
}
export default connect(mapStateToProps)(ParameterDetail)
