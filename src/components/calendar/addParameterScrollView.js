import { Button, Input, Text } from '@ui-kitten/components'
import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS } from '@constants/strings'
import { StyledScrollView } from '@components/calendar/styles'
import { LoadingIndicator, TextNunitoSans } from '@components/common'
import { IconMultiplier } from '@components/Icons/fa-icon-multiplier'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default function AddParameterScrollView({
  data,
  onSubmit,
  defaultSelectedValues,
  loading,
}) {
  const [selectedValues, setSelectedValues] = useState({})

  useEffect(() => {
    if (![null, undefined].includes(defaultSelectedValues)) {
      Object.keys(defaultSelectedValues).map((key) => {
        const value = defaultSelectedValues[key]
        if (value) {
          if (typeof value === 'boolean') {
            setSelectedValues((prevState) => ({
              ...prevState,
              [key]: 'Yes',
            }))
          } else {
            setSelectedValues((prevState) => ({
              ...prevState,
              [key]: defaultSelectedValues[key],
            }))
          }
        }
      })
    }
  }, [defaultSelectedValues])

  // console.log(selectedValues)
  // console.log({ defaultSelectedValues })
  const handleOnSubmit = () => {
    // Filter items that are not set/null
    // const filterNull = pickBy(selectedValues, (item) => item !== null && item)
    onSubmit(selectedValues)
  }

  const renderRadio = (data, key) => {
    const handleSelect = (value) => {
      console.log({ value, selectedValues })
      if (selectedValues?.[key] === value) {
        setSelectedValues((prevState) => ({ ...prevState, [key]: null }))
      } else {
        setSelectedValues((prevState) => ({ ...prevState, [key]: value }))
      }
    }

    return (
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={{
              marginRight: 15,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 5,
              backgroundColor:
                selectedValues?.[key] === type.key
                  ? 'rgba(52,96,243,0.24)'
                  : 'transparent',
            }}
            onPress={() => handleSelect(type.key)}
          >
            {type.type === 'multipleIcon' && (
              <IconMultiplier
                number={type.number}
                font={type.font}
                color={type.color}
              />
            )}

            {type.type === 'singleIcon' && (
              <FontAwesomeIcon icon={type.icon} size={20} color={type.color} />
            )}

            {type.type === 'twoIcons' && (
              <View style={{ flexDirection: 'row' }}>
                <FontAwesomeIcon
                  icon={type.icon1}
                  size={20}
                  color={type.color1}
                  style={{ marginRight: 5 }}
                />
                <FontAwesomeIcon
                  icon={type.icon2}
                  size={20}
                  color={type.color2}
                />
              </View>
            )}

            <View
              style={{
                alignItems: 'center',
              }}
            >
              <TextNunitoSans
                text={type.key}
                style={{
                  fontSize: 12,
                  marginTop: 5,
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </StyledScrollView>
    )
  }

  const renderTextBox = (key) => {
    const handleOnChange = (value) => {
      setSelectedValues((prevState) => ({ ...prevState, [key]: value }))
    }

    return (
      <Input
        multiline={true}
        textStyle={{ minHeight: 64 }}
        placeholder="Note"
        value={selectedValues?.[key]}
        onChangeText={(value) => handleOnChange(value)}
      />
    )
  }

  const renderOptions = (row) => {
    const { type, data, title, key } = row

    switch (type) {
      case 'checkbox':
        return renderRadio(data, key)
      case 'radio':
        return renderRadio(data, key)
      case 'textbox':
        return renderTextBox(key)
      default:
        return
    }
  }

  const renderTitle = (title) => {
    return (
      <Text
        style={{
          marginBottom: 8,
          fontFamily: FONTS.NunitoSans_700Bold,
          textAlign: 'left',
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    )
  }

  return (
    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
      {data.map((row, index) => {
        return (
          <View key={index}>
            {renderTitle(row.title)}
            {renderOptions(row)}
          </View>
        )
      })}
      <Button
        style={{ marginVertical: 20 }}
        onPress={handleOnSubmit}
        disabled={loading}
        accessoryLeft={loading && LoadingIndicator}
      >
        Save
      </Button>
    </View>
  )
}
