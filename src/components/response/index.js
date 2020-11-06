import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '@constants/strings'
import { View, StyleSheet } from 'react-native'
import {
  Button,
  ButtonGroup,
  CheckBox,
  Datepicker,
  Icon,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import { TextNunitoSans } from '@components/common'

import { MomentDateService } from '@ui-kitten/moment'

const dateService = new MomentDateService()

const extract_value = (responses, question) => {
  return responses[question.key]
}

export const RenderRadio = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  const [isYesNo, setIsYesNo] = useState()

  useEffect(() => {
    if (initialValues[question.key]) {
      handleGetNextQuestion(question, initialValues[question.key])
    }
  }, [])

  const { values } = question
  const [selectedValue, setSelectedValue] = useState()

  const handleOnSelect = (index) => {
    setSelectedValue(index)
    handleGetNextQuestion(question, values[index])
  }

  return (
    <View>
      <RadioGroup selectedIndex={selectedValue} onChange={handleOnSelect}>
        {values.map((value) => (
          <Radio style={styles.radio} key={value}>
            <TextNunitoSans
              text={value}
              fontFamily={FONTS.NunitoSans_400Regular}
              toCapitalise
            />
          </Radio>
        ))}
      </RadioGroup>
    </View>
  )
}

export const RenderLabel = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  // useEffect(() => {
  //   if (initialValues) {
  //     handleGetNextQuestion(question)
  //   }
  // }, [])

  return (
    <Button onPress={() => handleGetNextQuestion(question)}>Proceed</Button>
  )
}

export const RenderTextInput = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  useEffect(() => {
    if (initialValues[question.key]) {
      handleGetNextQuestion(question, initialValues[question.key])
    }
  }, [])

  const [value, setValue] = useState('')
  return (
    <>
      <Input
        style={styles.input}
        size="medium"
        value={value}
        onChangeText={(value) => setValue(value)}
        returnKeyType="next"
        placeholder="Type your response here"
      />
      <Button
        onPress={() => handleGetNextQuestion(question, value)}
        style={{ marginTop: 10 }}
        disabled={value === ''}
        type="primary"
      >
        Next
      </Button>
    </>
  )
}

export const RenderNumberInput = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  useEffect(() => {
    if (initialValues[question.key]) {
      handleGetNextQuestion(question, initialValues[question.key])
    }
  }, [])

  const [value, setValue] = useState('')
  return (
    <>
      <Input
        value={value}
        onChangeText={(value) => setValue(value)}
        keyboardType="numeric"
        placeholder="Type your response here"
        enablesReturnKeyAutomatically
        returnKeyType="done"
      />
      <Button
        onPress={() => handleGetNextQuestion(question, value)}
        style={{ marginTop: 10 }}
        disabled={value === ''}
        type="primary"
      >
        Next
      </Button>
    </>
  )
}

export const RenderTextAreaInput = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  useEffect(() => {
    if (initialValues[question.key]) {
      handleGetNextQuestion(question, initialValues[question.key])
    }
  }, [])

  const [value, setValue] = useState('')
  return (
    <>
      <Input
        multiline={true}
        textStyle={{ minHeight: 64 }}
        value={value}
        placeholder="Type your response here"
        onChangeText={(value) => setValue(value)}
        // enablesReturnKeyAutomatically
        // returnKeyType="done"
      />
      <Button
        onPress={() => handleGetNextQuestion(question, value)}
        style={{ marginTop: 10 }}
        disabled={value === ''}
        type="primary"
      >
        Next
      </Button>
    </>
  )
}

export const RenderDate = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  useEffect(() => {
    if (initialValues[question.key]) {
      handleGetNextQuestion(question, initialValues[question.key])
    }
  }, [])

  function onChange(date) {
    setDate(date)
    handleGetNextQuestion(question, date)
  }

  const [date, setDate] = React.useState(moment())

  return (
    <>
      <Datepicker
        placeholder="Pick Date"
        date={date}
        dateService={dateService}
        onSelect={(nextDate) => onChange(nextDate)}
      />
    </>
  )
}

export const RenderCheckbox = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  useEffect(() => {
    if (initialValues[question.key]) {
      handleGetNextQuestion(question, initialValues[question.key])
    }
  }, [])

  const { values } = question

  const [selectedValue, setSelectedValue] = useState([])

  const handlePress = (value) => {
    if (selectedValue.includes(value)) {
      let newValues = selectedValue.filter((v) => v !== value)
      setSelectedValue(newValues)
    } else {
      setSelectedValue((prevState) => [...prevState, value])
    }
  }

  return (
    <View>
      {values.map((value) => (
        <CheckBox
          style={[styles.checkbox, { margin: 8 }]}
          key={value}
          onChange={() => handlePress(value)}
          checked={selectedValue.includes(value)}
        >
          <TextNunitoSans
            text={value}
            fontFamily={FONTS.NunitoSans_400Regular}
            toCapitalise
          />
        </CheckBox>
      ))}

      <Button
        onPress={() => handleGetNextQuestion(question, selectedValue)}
        style={{ marginTop: 10 }}
        disabled={selectedValue.length === 0}
        type="primary"
      >
        Next
      </Button>
    </View>
  )
}

export const RenderQuestionText = ({ text, index }) => {
  return (
    <TextNunitoSans
      text={`${index}. ${text}`}
      style={{ textAlign: 'justify', paddingBottom: 20 }}
    />
  )
}

export const RenderEndOfQuestion = ({ text }) => {
  return (
    <Layout level="2" style={{ paddingTop: 30, paddingBottom: 30 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <AntDesign name="checkcircleo" size={50} color="green" />
        <TextNunitoSans
          text={text}
          style={{ fontSize: 18, padding: 5, textAlign: 'justify' }}
        />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    margin: 2,
  },
  checkbox: {
    margin: 2,
  },
})
