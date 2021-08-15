import React, { useEffect, useState } from 'react'
import { FONTS } from '@constants/strings'
import { View, StyleSheet } from 'react-native'
import {
  Button,
  CheckBox,
  Datepicker,
  Input,
  Layout,
  Radio,
  RadioGroup,
} from '@ui-kitten/components'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import { TextNunitoSans } from '@components/common'
import { MomentDateService } from '@ui-kitten/moment'

const dateService = new MomentDateService('en-AU')

const RenderBooleanC = ({ question, handleGetNextQuestion, initialValues }) => {
  const [selectedValue, setSelectedValue] = useState()
  useEffect(() => {
    let questionKey = question.key
    let doesInitialValueExists = initialValues.hasOwnProperty(questionKey)
    let initialValue = initialValues[questionKey]

    if (doesInitialValueExists) {
      if (initialValue) {
        handleGetNextQuestion(question, true)
        setSelectedValue(0)
      } else {
        handleGetNextQuestion(question, false)
        setSelectedValue(1)
      }
    }
  }, [])

  const handleOnSelect = (index) => {
    // let valueConvert = value ? '_VALUE_TRUE' : '_VALUE_FALSE'
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

const RenderRadioC = ({ question, handleGetNextQuestion, initialValues }) => {
  const { values } = question
  const [selectedValue, setSelectedValue] = useState()
  const [showInput, setShowInput] = useState(false)
  const [inputText, setInputText] = useState()

  useEffect(() => {
    let questionKey = question.key
    let initialValue = initialValues[questionKey]
    if (initialValue) {
      let indexValue = values.indexOf(initialValue)
      if (indexValue === -1) {
        indexValue = values.indexOf('OTHER_SPECIFY')
        setShowInput(true)
        setInputText(initialValue)
      }
      setSelectedValue(indexValue)
      handleGetNextQuestion(question, initialValue)
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
            disabled={selectedValue.length === 0 || (showInput && !inputText)}
          >
            Next
          </Button>
        </>
      )}
    </View>
  )
}

const RenderLabelC = ({ question, handleGetNextQuestion, initialValues }) => {
  // useEffect(() => {
  //   if (initialValues) {
  //     handleGetNextQuestion(question)
  //   }
  // }, [])

  return (
    <Button onPress={() => handleGetNextQuestion(question, '_VALUE_ANY')}>
      Proceed
    </Button>
  )
}

const RenderTextInputC = ({
  question,
  handleGetNextQuestion,
  initialValues,
  onInitialValueGoToAutoNext,
  metaData,
}) => {
  const [value, setValue] = useState('')
  const { preFill, optionalSkipText } = question
  // const [displayNextBtn, setDisplayNextBtn] = useState(false)

  // useEffect(() => {
  //   let questionKey = question.key
  //   if (initialValues[questionKey]) {
  //     setValue(initialValues[questionKey])
  //     handleGetNextQuestion(question, initialValues[questionKey])
  //   }
  // }, [])

  useEffect(() => {
    let questionKey = question.key

    if (initialValues[questionKey]) {
      setValue(initialValues[questionKey])
      // if (onInitialValueGoToAutoNext) {
      //   handleGetNextQuestion(question, initialValues[questionKey])
      // }
    }
    if (preFill?.key) {
      let initialValue = metaData[preFill.key]
      if (initialValue) {
        setValue(initialValue)
      }
    }
  }, [])

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
        textStyle={{ textAlign: 'left' }}
      />

      <Button
        onPress={() => handleGetNextQuestion(question, value)}
        style={{ marginTop: 10 }}
        disabled={value === ''}
        type="primary"
      >
        Next
      </Button>

      {!value && optionalSkipText && (
        <Button
          onPress={() => {
            handleGetNextQuestion(question, '_VALUE_ANY')
          }}
          style={{ marginTop: 10 }}
          status={'danger'}
        >
          {optionalSkipText}
        </Button>
      )}
    </>
  )
}

const RenderNumberInputC = ({
  question,
  handleGetNextQuestion,
  initialValues,
  onInitialValueGoToAutoNext,
  metaData,
}) => {
  const [value, setValue] = useState('')
  const { preFill } = question

  useEffect(() => {
    let questionKey = question.key
    let initialValue = initialValues[questionKey]
    if (initialValue) {
      setValue(initialValue)
      // if (onInitialValueGoToAutoNext) {
      //   handleGetNextQuestion(question, initialValue)
      // }
    }
    if (preFill?.key) {
      initialValue = metaData[preFill.key]
      if (initialValue) {
        setValue(initialValue.replace(/\D/g, ''))
      }
    }
  }, [])

  return (
    <>
      <Input
        value={value}
        onChangeText={(value) => !isNaN(value) && setValue(value)}
        keyboardType="numeric"
        placeholder="Type your response here"
        enablesReturnKeyAutomatically
        returnKeyType="done"
        onEndEditing={() => handleGetNextQuestion(question, value)}
        textStyle={{ textAlign: 'left' }}
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

const RenderTextAreaInputC = ({
  question,
  handleGetNextQuestion,
  initialValues,
  onInitialValueGoToAutoNext,
  metaData,
}) => {
  const [value, setValue] = useState('')
  const { preFill, optionalSkipText } = question

  useEffect(() => {
    let questionKey = question.key
    let initialValue = initialValues[questionKey]
    if (initialValue) {
      setValue(initialValue)
      // if (onInitialValueGoToAutoNext) {
      //   handleGetNextQuestion(question, initialValue)
      // }
    }

    if (preFill?.key) {
      initialValue = metaData[preFill.key]
      if (initialValue) {
        setValue(initialValue)
      }
    }
  }, [])

  return (
    <>
      <Input
        multiline={true}
        textStyle={{ minHeight: 64, textAlign: 'left' }}
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

      {!value && optionalSkipText && (
        <Button
          onPress={() => {
            handleGetNextQuestion(question, '_VALUE_ANY')
          }}
          style={{ marginTop: 10 }}
          status={'danger'}
        >
          {optionalSkipText}
        </Button>
      )}
    </>
  )
}

const RenderDateC = ({
  question,
  handleGetNextQuestion,
  initialValues,
  onInitialValueGoToAutoNext,
  metaData,
}) => {
  const { optionalSkipText } = question
  const [selectedValue, setSelectedValue] = useState()
  const [displayNextBtn, setDisplayNextBtn] = useState(false)
  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()
  const dateFormat = 'YYYY-MM-DD'

  useEffect(() => {
    let questionKey = question.key
    if (initialValues[questionKey]) {
      let initDate = moment(initialValues[questionKey], dateFormat)
      setSelectedValue(initDate)
      if (onInitialValueGoToAutoNext) {
        handleGetNextQuestion(question, initialValues[questionKey])
      } else {
        setDisplayNextBtn(true)
      }
    }
    if (question.key === 'first_day_last_period') {
      const minDate = moment(metaData.first_day_last_period, 'DD-MM-YYYY')
      if (metaData.first_day_last_period) {
        setMinDate(minDate)
      } else {
        setMinDate(moment().subtract(1, 'months'))
      }
      setMaxDate(moment())
    } else {
      setMinDate(moment('01-01-1900', 'DD-MM-YYYY'))
      setMaxDate(moment('01-01-2030', 'DD-MM-YYYY'))
    }
  }, [])

  function onChange(date) {
    const dateFormatted = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
    setSelectedValue(date)
    handleGetNextQuestion(question, dateFormatted)
  }

  return (
    <>
      <Datepicker
        placeholder="Pick Date"
        date={selectedValue}
        dateService={dateService}
        onSelect={(nextDate) => onChange(nextDate)}
        //TODO: Uncomment min and max in production
        // min={question.key === 'first_day_last_period' && minDate}
        // max={question.key === 'first_day_last_period' && moment()}
        min={minDate}
        max={maxDate}
      />

      {displayNextBtn && (
        <Button
          onClick={() =>
            handleGetNextQuestion(question, selectedValue.format(dateFormat))
          }
          style={{ marginTop: 10 }}
          // disabled={selectedValue.length === 0 || (showInput && !inputText)}
          type="primary"
        >
          Next
        </Button>
      )}
      {optionalSkipText && (
        <Button
          onPress={() => {
            handleGetNextQuestion(question, '_VALUE_ANY')
          }}
          style={{ marginTop: 10 }}
          status={'danger'}
        >
          {optionalSkipText}
        </Button>
      )}
    </>
  )
}

const RenderCheckboxC = ({
  question,
  handleGetNextQuestion,
  initialValues,
}) => {
  const { values } = question

  const [selectedValue, setSelectedValue] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [inputText, setInputText] = useState()

  useEffect(() => {
    let questionKey = question.key
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
    let values = []
    if (selectedValue.includes(value)) {
      let filteredValues = selectedValue.filter((item) => item !== value)
      values = filteredValues
      setSelectedValue((prevValue) => [...filteredValues])
    } else {
      setSelectedValue((prevValue) => [...prevValue, value])
      values = [...selectedValue, value]
    }

    if (values.includes('OTHER_SPECIFY')) {
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

const RenderQuestionTextC = ({ index, question, initialValues, metaData }) => {
  const { questionText, caption, preFill, showMetaDataKey } = question
  let questionKey = question.key
  let preFillValue = initialValues[questionKey]

  return (
    <>
      <View>
        <TextNunitoSans
          text={`${index}. ${questionText}`}
          fontFamily={FONTS.NunitoSans_800ExtraBold}
          style={{ fontSize: 18 }}
        />
      </View>

      {caption?.type && caption?.value && (
        <View>
          {caption.type === 'META_DATA' && metaData[caption.value] && (
            <TextNunitoSans
              text={`${
                caption.prefix ? caption.prefix : 'Your previous answer was'
              } - ${metaData[caption.value] || 'None'}`}
              category={'c1'}
              fontFamily={FONTS.Roboto_400Regular}
              style={{
                fontSize: 16,
                padding: 8,
                backgroundColor: '#e0dcdc',
                borderRadius: 5,
                marginTop: 5,
              }}
            />
          )}
          {caption.type === 'STATIC' && (
            <TextNunitoSans
              text={caption.value}
              category={'c1'}
              fontFamily={FONTS.Roboto_400Regular}
              style={{
                fontSize: 14,
                padding: 8,
                backgroundColor: '#e0dcdc',
                borderRadius: 5,
              }}
            />
          )}
        </View>
      )}

      <View style={{ paddingLeft: 3, paddingBottom: 10 }}>
        {showMetaDataKey && metaData && metaData?.[showMetaDataKey] && (
          <TextNunitoSans
            text={`Previous Response: ${metaData?.[showMetaDataKey]}`}
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

const RenderEndOfQuestionC = ({ text }) => {
  return (
    <Layout style={{ paddingVertical: 20, marginBottom: 20, borderRadius: 10 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <AntDesign
          name="checkcircleo"
          size={50}
          color="green"
          style={{ marginBottom: 10 }}
        />
        <TextNunitoSans
          text={text}
          style={{ fontSize: 18, padding: 5, textAlign: 'center' }}
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

export const RenderBoolean = React.memo(RenderBooleanC)
export const RenderRadio = React.memo(RenderRadioC)
export const RenderLabel = React.memo(RenderLabelC)
export const RenderTextInput = React.memo(RenderTextInputC)
export const RenderNumberInput = React.memo(RenderNumberInputC)
export const RenderTextAreaInput = React.memo(RenderTextAreaInputC)
export const RenderDate = React.memo(RenderDateC)
export const RenderCheckbox = React.memo(RenderCheckboxC)
export const RenderQuestionText = React.memo(RenderQuestionTextC)
export const RenderEndOfQuestion = React.memo(RenderEndOfQuestionC)
