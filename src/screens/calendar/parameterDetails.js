import React from 'react'
import { connect } from 'react-redux'
import { Platform, View } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { data as paramData } from '@screens/addParameter/data'
import { Bolts } from '@components/bolts'
import { TextNunitoSans } from '@components/common'
import { FONTS } from '@constants/strings'

function ParameterDetail({ data }) {
  const extractParamInfo = (key, response) => {
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
            if (item !== 'note') {
              const {
                title,
                shortTitle = null,
                data,
                color = 'grey',
              } = extractParamInfo(item, values[item])
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
                  }}
                >
                  <View>
                    <TextNunitoSans
                      fontFamily={FONTS.NunitoSans_600SemiBold}
                      text={shortTitle || title}
                    />

                    <View
                      style={{
                        marginTop: 3,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {data?.type === 'multipleIcon' ? (
                        <Bolts number={data.number} color={data.color} />
                      ) : (
                        <View
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: 13,
                            backgroundColor: color,
                          }}
                        />
                      )}
                    </View>
                  </View>
                </Layout>
              )
            } else {
              return (
                <Layout
                  style={{
                    flex: 1,
                    flexBasis: '70%',
                    margin: 5,
                    borderRadius: 10,
                    padding: 10,
                  }}
                  level={'4'}
                >
                  <TextNunitoSans
                    text={'Notes:'}
                    fontFamily={FONTS.NunitoSans_800ExtraBold}
                  />
                  <TextNunitoSans text={values['note']} />
                </Layout>
              )
            }
          })}
        </View>
      )
    }
    return null
  }
  return (
    <Layout
      level={'1'}
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
