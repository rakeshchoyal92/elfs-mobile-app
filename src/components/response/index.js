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

export const RenderBoolean = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  const [selectedValue, setSelectedValue] = useState()

  useEffect(() => {
    let questionKey = question.key.toLowerCase()
    let doesInitialValueExists = initialValues.hasOwnProperty(questionKey)
    let initialValue = initialValues[questionKey]

    if (doesInitialValueExists) {
      if (initialValue) {
        handleGetNextQuestion(question, true)
        setSelectedValue(true)
      } else {
        handleGetNextQuestion(question, false)
        setSelectedValue(false)
      }
    }
  }, [])

  const handleOnSelect = (index) => {
    let value = index === 0
    setSelectedValue(index)
    handleGetNextQuestion(question, value)
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <RadioGroup
        onChange={handleOnSelect}
        style={{ width: '100%', fontSize: 20 }}
        selectedIndex={selectedValue}
      >
        <Radio status={'primary'} value={true}>
          Yes
        </Radio>
        <Radio status={'danger'} value={false}>
          No
        </Radio>
      </RadioGroup>
    </View>
  )
}

export const RenderRadio = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  const { values } = question
  const [selectedValue, setSelectedValue] = useState()
  const [showInput, setShowInput] = useState(false)
  const [inputText, setInputText] = useState()

  useEffect(() => {
    let questionKey = question.key.toLowerCase()

    if (initialValues[questionKey]) {
      setSelectedValue(initialValues[questionKey])
      handleGetNextQuestion(question, initialValues[questionKey])
    }
  }, [])

  const handleOnSelect = (index) => {
    const selectedValue = values[index]

    if (selectedValue === 'OTHER_SPECIFY') {
      setShowInput(true)
      setSelectedValue(index)
    } else {
      setShowInput(false)
      setSelectedValue(index)
      handleGetNextQuestion(question, selectedValue)
    }
  }

  const handleGoNext = () => {
    handleGetNextQuestion(question, inputText)
  }

  return (
    <View>
      <RadioGroup selectedIndex={selectedValue} onChange={handleOnSelect}>
        {values.map((value) => (
          <Radio style={styles.radio} key={value}>
            <TextNunitoSans
              text={
                value === 'OTHER_SPECIFY'
                  ? 'Other (please specify)'
                  : value[0].toUpperCase() +
                    value.slice(1).replace(/_/g, ' ').toLowerCase()
              }
              fontFamily={FONTS.NunitoSans_400Regular}
              toCapitalise
            />
          </Radio>
        ))}
      </RadioGroup>

      {showInput && (
        <>
          <Input
            placeholder="Enter your response here"
            value={inputText}
            onChangeText={(value) => setInputText(value)}
            onEndEditing={() => handleGoNext()}
          />
          <Button
            onPress={handleGoNext}
            type={'primary'}
            style={{ marginTop: 5 }}
            disabled={selectedValue.length === 0}
          >
            Next
          </Button>
        </>
      )}
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
        onEndEditing={() => handleGetNextQuestion(question, value)}
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
        onEndEditing={() => handleGetNextQuestion(question, value)}
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
        onEndEditing={() => handleGetNextQuestion(question, value)}
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
  // useEffect(() => {
  //   if (initialValues[question.key]) {
  //     handleGetNextQuestion(question, initialValues[question.key])
  //   }
  // }, [])
  //
  // const { values } = question
  //
  // const [selectedValue, setSelectedValue] = useState([])
  //
  // const handlePress = (value) => {
  //   if (selectedValue.includes(value)) {
  //     let newValues = selectedValue.filter((v) => v !== value)
  //     setSelectedValue(newValues)
  //   } else {
  //     setSelectedValue((prevState) => [...prevState, value])
  //   }
  // }

  const { values } = question

  const [selectedValue, setSelectedValue] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [inputText, setInputText] = useState()

  useEffect(() => {
    let questionKey = question.key.toLowerCase()
    if (initialValues[questionKey]) {
      setSelectedValue(initialValues[questionKey])
      handleGetNextQuestion(question, initialValues[questionKey])
    }
  }, [])

  const handleGoNext = () => {
    let modSelectedValues = selectedValue
    if (selectedValue.includes('OTHER_SPECIFY')) {
      modSelectedValues = [...modSelectedValues, inputText]
      modSelectedValues = modSelectedValues.filter(
        (item) => item !== 'OTHER_SPECIFY'
      )
    }
    handleGetNextQuestion(question, modSelectedValues)
  }

  const handleOnSelect = (value) => {
    if (selectedValue.includes(value)) {
      let newValues = selectedValue.filter((v) => v !== value)
      setSelectedValue(newValues)
    } else {
      setSelectedValue((prevState) => [...prevState, value])
    }

    if (value === 'OTHER_SPECIFY') {
      setShowInput(true)
    } else {
      setShowInput(false)
    }
  }

  return (
    <View>
      {values.map((value) => (
        <CheckBox
          style={[styles.checkbox, { margin: 8 }]}
          key={value}
          onChange={() => handleOnSelect(value)}
          checked={selectedValue.includes(value)}
        >
          <TextNunitoSans
            text={value}
            fontFamily={FONTS.NunitoSans_400Regular}
            toCapitalise
          />
        </CheckBox>
      ))}

      {showInput && (
        <>
          <Input
            placeholder="Enter your response here"
            value={inputText}
            onChangeText={(value) => setInputText(value)}
            onEndEditing={() => handleGoNext()}
          />
        </>
      )}

      <Button
        onPress={handleGoNext}
        style={{ marginTop: 10 }}
        disabled={selectedValue.length === 0}
        type="primary"
      >
        Next
      </Button>
    </View>
  )
}

export const RenderQuestionText = ({ index, question, initialValues }) => {
  const { questionText, caption, preFill } = question
  let questionKey = question.key.toLowerCase()
  let preFillValue = initialValues[questionKey]

  return (
    <>
      <View>
        <TextNunitoSans
          text={`${index}. ${questionText}`}
          fontFamily={FONTS.NunitoSans_800ExtraBold}
        />
      </View>

      <View style={{ paddingLeft: 3, paddingBottom: 10 }}>
        {caption && (
          <TextNunitoSans
            text={caption}
            category={'c1'}
            fontFamily={FONTS.NunitoSans_300Light_Italic}
            style={{ fontSize: 12 }}
          />
        )}
      </View>

      <View style={{ paddingLeft: 3, paddingBottom: 10 }}>
        {preFillValue && (
          <View>
            <TextNunitoSans style={{ color: 'red', marginRight: 5 }}>
              *
            </TextNunitoSans>
            <TextNunitoSans
              style={{ fontSize: 14 }}
              type={'secondary'}
              text={
                preFill?.caption ||
                '(Value is pre-filled from previous survey. If the response is not changed, press "Next" to proceed)'
              }
            />
          </View>
        )}
      </View>
    </>
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

export const TunnelRender = ({
  nextQuestionKey,
  currentSurveyKey,
  handleSetNextQuestionKey,
}) => {
  useEffect(() => {
    handleSetNextQuestionKey(currentSurveyKey, nextQuestionKey)
  }, [])

  return null
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
