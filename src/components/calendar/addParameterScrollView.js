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
            style={{ marginRight: 25 }}
            onPress={() => handleSelect(type.key)}
          >
            <StyledEmojiView>
              <Emoji name={type.icon} style={{ fontSize: 30 }} />
            </StyledEmojiView>
            <View style={{ alignItems: 'center' }}>
              <StyledEmojiCaption
                style={{
                  fontFamily: FONTS.NunitoSans_400Regular,
                  color: selectedValues?.[key] === type.key ? 'black' : '#777',
                }}
              >
                {type.key}
              </StyledEmojiCaption>
              {selectedValues?.[key] === type.key && (
                <Emoji key={type} name="white_check_mark" />
              )}
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
          marginBottom: 10,
          fontFamily: FONTS.NunitoSans_700Bold,
          textAlign: 'left',
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
      <Button onPress={handleOnSubmit}> Save </Button>
    </View>
  )
}
