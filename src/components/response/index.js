import React, { useEffect, useState } from 'react'
import { FONTS } from '@constants/strings'
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import {
  Button,
  CheckBox,
  Datepicker,
  Input,
  Layout,
  NativeDateService,
  Radio,
  RadioGroup,
} from '@ui-kitten/components'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import { TextNunitoSans } from '@components/common'
import { MomentDateService } from '@ui-kitten/moment'
import { VARIABLE_MATCHING_STRATEGY, VALUES_SELECTED } from '@constants/strings'
import { isNumeric } from '@utils/misc'
import { useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// const dateService = new MomentDateService('en-AU')
// moment.updateLocale('en-AU', {
//   longDateFormat: {
//     L: 'DD/MM/YYYY',
//     l: 'D/M/YYYY',
//   },
// })

const formatDateService = new NativeDateService('en', { format: 'DD/MM/YYYY' })

const evaluateCondition = (key, questions, responseDict, metaData) => {
  /**
   * Evaluates to true/false
   * @param condition
   * @returns {boolean || string}
   */

  const evaluate = (condition) => {
    const { extractValueFrom, matchingStrategy, onValue, variable } = condition

    if (extractValueFrom) {
      let valueObtainedFromServerSurvey

      //FIXME: First check the current survey followed by metadata from the server
      // surveyValue holds value of survey response. Last response is since last
      // question response is not updated at responseDict at this point
      const surveyValues = {
        ...responseDict,
      }

      if (surveyValues.hasOwnProperty(variable)) {
        valueObtainedFromServerSurvey = surveyValues[variable]
      } else {
        valueObtainedFromServerSurvey = metaData[variable]
      }
      // console.log('Evaluate', variable, valueObtainedFromServerSurvey)
      // response: state.survey.response,

      switch (matchingStrategy) {
        case VARIABLE_MATCHING_STRATEGY.NULL_NOTNULL: {
          if (onValue === VALUES_SELECTED.NULL) {
            return valueObtainedFromServerSurvey === null
          }
          return valueObtainedFromServerSurvey !== null
        }

        case VARIABLE_MATCHING_STRATEGY.NOT_EQUAL: {
          return valueObtainedFromServerSurvey !== onValue
        }

        case VARIABLE_MATCHING_STRATEGY.TRUE_FALSE: {
          if (onValue === VALUES_SELECTED.FALSE) {
            return valueObtainedFromServerSurvey === false
          }
          return valueObtainedFromServerSurvey === true
        }

        case VARIABLE_MATCHING_STRATEGY.EQUAL: {
          if (isNumeric(onValue)) {
            return valueObtainedFromServerSurvey === Number(onValue)
          } else {
            return valueObtainedFromServerSurvey === onValue
          }
        }

        case VARIABLE_MATCHING_STRATEGY.GREATER: {
          return valueObtainedFromServerSurvey >= Number(onValue)
        }

        case VARIABLE_MATCHING_STRATEGY.LESSER: {
          return valueObtainedFromServerSurvey <= Number(onValue)
        }
      }
    } else {
      console.log('Inside else block')
    }
  }

  let condition = questions.find((question) => question.key === key)
  const { type, conditions, conditionalNext } = condition

  if (type === 'SINGLE') {
    return evaluate(conditions[0])
  } else {
    let resultExpression = ''
    let result

    conditions.map((condition, index) => {
      let currentConditionEvaluatedValue = evaluate(condition)

      let logicalOperatorToNextQ =
        condition.logicalOperatorToNextQ === 'AND' ? '&&' : '||'

      // result = currentConditionEvaluatedValue
      // evaluate conditions based on logicalOperatorToNextQ.
      // last element has no logicalOperatorToNextQ.
      // first index evaluate, second index evaluate with first index's logicalOperatorToNextQ and so on

      resultExpression += `${currentConditionEvaluatedValue}`
      if (index !== conditions.length - 1) {
        resultExpression += `${logicalOperatorToNextQ} `
      }
    })

    return eval(resultExpression)
  }
}

const RenderBooleanC = ({ question, handleGetNextQuestion, initialValues }) => {
  const [selectedValue, setSelectedValue] = useState()
  const { defaultSelectedValue } = question
  const [showNextButton, setShowNextButton] = useState(false)

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
    } else if (defaultSelectedValue) {
      setSelectedValue(defaultSelectedValue === '_VALUE_TRUE' ? 0 : 1)
      setShowNextButton(true)
    }
  }, [])

  const handleOnSelect = (index) => {
    // let valueConvert = value ? '_VALUE_TRUE' : '_VALUE_FALSE'
    setShowNextButton(false)
    let value = index === 0
    setSelectedValue(index)
    handleGetNextQuestion(question, value)
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <RadioGroup
        onChange={handleOnSelect}
        style={{ width: '100%', fontSize: 30 }}
        selectedIndex={selectedValue}
      >
        <Radio status={'primary'} value={true}>
          <TextNunitoSans text={'Yes'} style={{ fontSize: 18 }} />
        </Radio>
        <Radio status={'danger'} value={false}>
          <TextNunitoSans text={'No'} style={{ fontSize: 18 }} />
        </Radio>
      </RadioGroup>

      {showNextButton && (
        <Button
          onPress={() => {
            setShowNextButton(false)
            handleOnSelect(selectedValue)
          }}
          type={'primary'}
          style={{ marginTop: 5, width: '100%' }}
        >
          Next
        </Button>
      )}
    </View>
  )
}

const RenderRadioC = ({
  question,
  handleGetNextQuestion,
  initialValues,
  metaData,
}) => {
  const { values, displayValuesOnCondition, defaultSelectedValue } = question
  const [selectedValue, setSelectedValue] = useState()
  const [showInput, setShowInput] = useState(false)
  const [inputText, setInputText] = useState()
  const [showNextButton, setShowNextButton] = useState(false)

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
      setShowNextButton(false)
      handleGetNextQuestion(question, initialValue)
    } else if (defaultSelectedValue) {
      let indexValue = values.indexOf(defaultSelectedValue)
      setSelectedValue(indexValue)
      setShowNextButton(true)
    }
  }, [])

  const handleOnSelect = (index) => {
    const selectedValue = values[index]
    setShowNextButton(false)
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

  const questions = useSelector(({ questions }) => questions.questions)
  const responseDict = useSelector(({ survey }) => survey.response_dict)

  const valueExistsInDisplayValuesOnCondition = (value) => {
    if (displayValuesOnCondition?.length >= 1) {
      const condition = displayValuesOnCondition.find(
        (item) => item.value === value
      )
      if (condition) {
        return condition
      }
      return false
    }
    return false
  }

  return (
    <View>
      <RadioGroup selectedIndex={selectedValue} onChange={handleOnSelect}>
        {values.map((value) => {
          //DVOC = displayValuesOnCondition
          const valueInDVOC = valueExistsInDisplayValuesOnCondition(value)
          if (valueInDVOC) {
            const { condition, value } = valueInDVOC
            let evaluate = evaluateCondition(
              condition,
              questions,
              responseDict,
              metaData
            )
            if (evaluate) {
              return (
                <Radio style={styles.radio} key={value}>
                  <TextNunitoSans
                    style={{ fontSize: 18 }}
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
              )
            } else {
              return <View key={value} style={{ marginTop: -10 }} />
            }
          } else {
            return (
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
            )
          }
        })}
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

      {showNextButton && (
        <Button
          onPress={() => {
            setShowNextButton(false)
            handleOnSelect(selectedValue)
          }}
          type={'primary'}
          style={{ marginTop: 5 }}
        >
          Next
        </Button>
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
      if (onInitialValueGoToAutoNext) {
        handleGetNextQuestion(question, initialValues[questionKey])
      }
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
  const { preFill, optionalSkipText } = question

  useEffect(() => {
    let questionKey = question.key
    let initialValue = initialValues[questionKey]
    if (initialValue) {
      setValue(initialValue.toString())
      if (onInitialValueGoToAutoNext) {
        handleGetNextQuestion(question, initialValue)
      }
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
        <TextNunitoSans text={'Next'} />
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
  const periodCycleType = metaData['period_cycle_type']

  useEffect(() => {
    let questionKey = question.key
    if (initialValues[questionKey]) {
      let initDate = moment(initialValues[questionKey], dateFormat)
      setSelectedValue(new Date(initDate))
      if (onInitialValueGoToAutoNext) {
        handleGetNextQuestion(question, initialValues[questionKey])
      } else {
        setDisplayNextBtn(true)
      }
    }
    if (question.key === 'first_day_last_period') {
      if (metaData.first_day_last_period) {
        const minDate = moment(
          metaData.first_day_last_period,
          'DD-MM-YYYY'
        ).toDate()
        setMinDate(minDate)
      } else {
        setMinDate(moment().subtract(20, 'months'))
      }
      setMaxDate(new Date())
    } else {
      setMinDate(moment('01-01-1900', 'DD-MM-YYYY').toDate())
      setMaxDate(moment('01-01-2030', 'DD-MM-YYYY').toDate())
    }
  }, [])

  function onChange(date) {
    const dateFormatted = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
    setSelectedValue(date)
    handleGetNextQuestion(question, dateFormatted)
  }

  const datePickerRed = React.useRef()

  return (
    <>
      <View style={{ flex: 1, display: 'inlineBlock' }}>
        <Datepicker
          ref={datePickerRed}
          placeholder="Pick Date"
          date={selectedValue}
          dateService={formatDateService}
          onSelect={(nextDate) => onChange(nextDate)}
          min={new Date(minDate)}
          max={new Date(maxDate)}
          placement={'bottom'}
        />
      </View>

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

      {periodCycleType === 'OLIGO' && question.key === 'first_day_last_period' && (
        <Button
          onPress={() => {
            handleGetNextQuestion(question, '_VALUE_ANY')
          }}
          style={{ marginTop: 10 }}
          status={'danger'}
        >
          Date not changed since last period
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
    let values
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
            style={{ fontSize: 18 }}
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
          // style={{ fontSize: 18 }}
        />
      </View>

      {caption?.type && caption?.value && (
        <View style={{ borderRadius: 10 }}>
          {caption.type === 'META_DATA' && metaData[caption.value] && (
            <TextNunitoSans
              text={`${
                caption.prefix ? caption.prefix : 'Your previous answer was'
              } - ${metaData[caption.value] || 'None'}`}
              category={'c1'}
              fontFamily={FONTS.Roboto_400Regular}
              style={{
                // fontSize: 16,
                padding: 8,
                backgroundColor: '#777',
                color: 'white',
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
                // fontSize: 14,
                padding: 8,
                backgroundColor: '#777',
                color: 'white',
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
        <TextNunitoSans
          text="Please review your responses before submitting survey"
          style={{
            fontSize: 20,
            padding: 5,
            textAlign: 'center',
            color: 'red',
          }}
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
