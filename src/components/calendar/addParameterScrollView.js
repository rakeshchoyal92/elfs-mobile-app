import { Button, Input } from '@ui-kitten/components'
import { View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '@constants/strings'
import Emoji from 'react-native-emoji'
import {
  StyledEmojiCaption,
  StyledEmojiView,
} from '@components/calendar/styles'
import { StyledScrollView } from '@components/calendar/styles'
import { pickBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'

const Bolts = ({ number, color }) => {
  const arrayGenerator = () =>
    Array(number)
      .fill(1)
      .map((x, y) => x + y)

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {arrayGenerator().map((item) => {
        return (
          <FontAwesomeIcon
            key={item}
            icon={faBolt}
            size={15}
            color={color}
            style={{ marginLeft: item === 1 ? 0 : -5 }}
          />
        )
      })}
    </View>
  )
}

export default function AddParameterScrollView({ data, onSubmit }) {
  const [selectedValues, setSelectedValues] = useState({})

  const handleOnSubmit = () => {
    // Filter items that are not set/null
    const filterNull = pickBy(selectedValues, (item) => item !== null && item)
    onSubmit(filterNull)
  }

  const renderRadio = (data, key) => {
    const handleSelect = (value) => {
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
                  : 'white',
            }}
            onPress={() => handleSelect(type.key)}
          >
            {/*{type.type === 'singleIcon' && (*/}
            {/*  <StyledEmojiView>*/}
            {/*    <Emoji name={type.icon} style={{ fontSize: 30 }} />*/}
            {/*  </StyledEmojiView>*/}
            {/*)}*/}

            {type.type === 'multipleIcon' && (
              <Bolts number={type.number} color={type.color} />
            )}

            <View style={{ alignItems: 'center' }}>
              <StyledEmojiCaption
                style={{
                  fontFamily:
                    selectedValues?.[key] === type.key
                      ? FONTS.NunitoSans_700Bold
                      : FONTS.NunitoSans_400Regular,
                  color: selectedValues?.[key] === type.key ? 'black' : '#777',
                }}
              >
                {type.key}
              </StyledEmojiCaption>
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
          marginBottom: 15,
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
      <Button style={{ marginVertical: 20 }} onPress={handleOnSubmit}>
        Save
      </Button>
    </View>
  )
}
