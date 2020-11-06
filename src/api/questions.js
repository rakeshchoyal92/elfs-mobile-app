import EP from '@src/api/endpoints'
import client from '@src/api'

const questions = [
  {
    id: 2,
    questionText:
      'Have any of the following changed since you completed you last study questionnaire?',
    key: 'HAVE_ANY_CHANGED_SINCE_LAST_STUDY',
    doesValuePersist: true,
    responseType: 'LABEL',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'WEIGHT_CHANGE_SINCE_LAST_STUDY',
      },
    ],
  },
  {
    id: 3,
    questionText: 'Your weight?',
    key: 'WEIGHT_CHANGE_SINCE_LAST_STUDY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'CURRENT_WEIGHT',
      },
      {
        onValue: 'No',
        key: 'MEDICATION_CHANGE_SINCE_LAST_STUDY',
      },
    ],
  },
  {
    id: 4,
    questionText: 'What is your current weight (kg)?',
    key: 'CURRENT_WEIGHT',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'MEDICATION_CHANGE_SINCE_LAST_STUDY',
      },
    ],
  },
  {
    id: 5,
    questionText: 'Your regular medications?',
    key: 'MEDICATION_CHANGE_SINCE_LAST_STUDY',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'CURRENT_MEDICATIONS',
      },
      {
        onValue: 'No',
        key: 'RELATIONSHIP_CHANGE_SINCE_LAST_STUDY',
      },
    ],
    values: ['Yes', 'No'],
  },
  {
    id: 6,
    questionText: 'Please list your current medications:',
    key: 'CURRENT_MEDICATIONS',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'RELATIONSHIP_CHANGE_SINCE_LAST_STUDY',
      },
    ],
  },
  {
    id: 7,
    questionText: 'Your relationship status?',
    key: 'RELATIONSHIP_CHANGE_SINCE_LAST_STUDY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'CURRENT_RELATIONSHIP_STATUS',
      },
      {
        onValue: 'No',
        key: 'SURGICAL_HISTORY_SINCE_LAST_STUDY',
      },
    ],
  },
  {
    id: 8,
    questionText:
      'Please select the option that best describes your current relationship status:',
    key: 'CURRENT_RELATIONSHIP_STATUS',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: [
      'SINGLE',
      'RELATIONSHIP_UNDER_6_MONTHS',
      'RELATIONSHIP_OVER_6_MONTHS',
    ],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'SURGICAL_HISTORY_SINCE_LAST_STUDY',
      },
    ],
  },
  {
    id: 9,
    questionText:
      'Your surgical history? (Have you had surgery since your last questionnaire?',
    key: 'SURGICAL_HISTORY_SINCE_LAST_STUDY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'HAD_PELVIC_SURGERY',
      },
      {
        onValue: 'No',
        key: null,
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'PARTICIPANT_COMPLETED_LAST_CYCLE',
          nextQuestions: [
            {
              onValue: 'No',
              key: 'PREGNANT_DURING_CYCLE',
            },
            {
              onValue: 'Yes',
              key: 'CURRENTLY_PREGNANT',
            },
          ],
        },
      },
    ],
  },
  {
    id: 10,
    questionText: 'Have you had pelvic surgery for endometriosis?',
    key: 'HAD_PELVIC_SURGERY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'PELVIC_SURGERY_DESCRIPTION',
      },
      {
        onValue: 'No',
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'PARTICIPANT_COMPLETED_LAST_CYCLE',
          nextQuestions: [
            {
              onValue: 'Yes',
              key: 'CURRENTLY_PREGNANT',
            },
            {
              onValue: 'No',
              key: 'PREGNANT_DURING_CYCLE',
            },
          ],
        },
      },
    ],
  },
  {
    id: 11,
    questionText:
      "At which hospital was the surgery performed and who was the operating gynaecologist? (If you don't know the name of the surgeon, please just provide the name of the hospital where the surgery was performed.)",
    key: 'PELVIC_SURGERY_DESCRIPTION',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'PARTICIPANT_COMPLETED_LAST_CYCLE',
          nextQuestions: [
            {
              onValue: 'No',
              key: 'PREGNANT_DURING_CYCLE',
            },
            {
              onValue: 'Yes',
              key: 'CURRENTLY_PREGNANT',
            },
          ],
        },
      },
    ],
  },
  {
    id: 13,
    questionText: 'Were you pregnant 1 month ago?',
    key: 'PREGNANT_DURING_CYCLE',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'CURRENTLY_PREGNANT',
      },
    ],
  },
  {
    id: 14,
    questionText: 'Are you currently pregnant?',
    key: 'CURRENTLY_PREGNANT',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'ULTRASOUND_SCAN_PREVIOUSLY_ENTERED',
          nextQuestions: [
            {
              onValue: 'Yes',
              key: 'NO_FURTHER_QUESTIONS',
            },
            {
              onValue: 'No',
              key: 'ULTRASOUND_PERFORMED_CURRENT_PREGNANCY',
            },
          ],
        },
      },
      {
        onValue: 'No',
        key: 'IS_PREGNANT_DURING_CYCLE_EQUAL_TRUE',
        decisionOnMetadata: {
          source: 'CURRENT_SURVEY',
          key: 'PREGNANT_DURING_CYCLE',
          nextQuestions: [
            {
              onValue: 'Yes',
              key: 'PREGNANCY_OUTCOME',
            },
            {
              onValue: 'No',
              key: 'SEXUAL_ACTIVITY',
            },
          ],
        },
      },
    ],
  },
  {
    id: 16,
    key: 'PREGNANCY_OUTCOME',
    questionText: 'What was the outcome of your most recent pregnancy?',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: [
      'Miscarriage',
      'Termination',
      'Ectopic Pregnancy',
      'Stillbirth',
      'Livebirth',
    ],
    nextQuestions: [
      {
        onValue: 'Miscarriage',
        key: 'PREGNANCY_OUTCOME_GESTATIONAL_WEEK',
      },
      {
        onValue: 'Termination',
        decisionOnMetadata: {
          source: 'CURRENT_SURVEY',
          key: 'PREGNANCY_OUTCOME',
          nextQuestions: [
            {
              onValue: 'Miscarriage',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Termination',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Ectopic Pregnancy',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Stillbirth',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Livebirth',
              key: 'CURRENTLY_BREASTFEEDING',
            },
          ],
        },
      },
      {
        onValue: 'Ectopic Pregnancy',
        decisionOnMetadata: {
          source: 'CURRENT_SURVEY',
          key: 'PREGNANCY_OUTCOME',
          nextQuestions: [
            {
              onValue: 'Miscarriage',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Termination',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Ectopic Pregnancy',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Stillbirth',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Livebirth',
              key: 'CURRENTLY_BREASTFEEDING',
            },
          ],
        },
      },
      {
        onValue: 'Stillbirth',
        key: 'PREGNANCY_OUTCOME_GESTATIONAL_WEEK',
      },
      {
        onValue: 'Livebirth',
        key: 'PREGNANCY_OUTCOME_GESTATIONAL_WEEK',
      },
    ],
  },
  {
    id: 17,
    questionText: 'What was the gestational week that the pregnancy ended?',
    key: 'PREGNANCY_OUTCOME_GESTATIONAL_WEEK',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        decisionOnMetadata: {
          source: 'CURRENT_SURVEY',
          key: 'PREGNANCY_OUTCOME',
          nextQuestions: [
            {
              onValue: 'Miscarriage',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Termination',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Ectopic Pregnancy',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Stillbirth',
              key: 'UNDERSTAND_CAUSE_DISTRESS',
            },
            {
              onValue: 'Livebirth',
              key: 'CURRENTLY_BREASTFEEDING',
            },
          ],
        },
      },
    ],
  },
  {
    id: 19,
    questionText: 'Are you currently breastfeeding?',
    key: 'CURRENTLY_BREASTFEEDING',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'CHILD_FEEDING_REGIMEN',
      },
      {
        onValue: 'No',
        key: 'NO_FURTHER_QUESTIONS',
      },
    ],
  },
  {
    id: 21,
    questionText:
      'Have you had an ultrasound performed in the current pregnancy',
    key: 'ULTRASOUND_PERFORMED_CURRENT_PREGNANCY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'ULTRASOUND_IMAGER',
      },
      {
        onValue: 'No',
        key: 'RECOMMEND_PELVIC_ULTRASOUND',
      },
    ],
  },
  {
    id: 22,
    questionText: 'What is your feeding regimen?',
    key: 'CHILD_FEEDING_REGIMEN',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Exclusively Breastfeeding', 'Mixed Feeding'],
    nextQuestions: [
      {
        onValue: 'Exclusively Breastfeeding',
        key: 'NO_FURTHER_QUESTIONS',
      },
      {
        onValue: 'Mixed Feeding',
        key: 'NO_FURTHER_QUESTIONS',
      },
    ],
  },
  {
    id: 23,
    questionText: 'What Imaging Provider performed the ultrasound?',
    key: 'ULTRASOUND_IMAGER',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'NO_FURTHER_QUESTIONS',
      },
    ],
  },
  {
    id: 24,
    questionText: 'What best describes your sexual activity this last month?',
    key: 'SEXUAL_ACTIVITY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: [
      'I have not been sexually active',
      'I have been using contraception',
      'I have been having unprotected sex but not necessarily trying to get pregnant',
      'I have been actively trying to get pregnant',
    ],
    nextQuestions: [
      {
        onValue: 'I have not been sexually active',
        key: 'NO_FURTHER_QUESTIONS',
      },
      {
        onValue: 'I have been using contraception',
        key: 'CONTRACEPTION_METHODS',
      },
      {
        onValue:
          'I have been having unprotected sex but not necessarily trying to get pregnant',
        key: 'UNPROTECTED_MONTHLY_FREQUENCY',
      },
      {
        onValue: 'I have been actively trying to get pregnant',
        key: 'PREGNANCY_ATTEMPT_METHOD',
      },
    ],
  },
  {
    id: 25,
    questionText:
      'What type of contraception have you been using? (select all that apply)',
    key: 'CONTRACEPTION_METHODS',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    values: [
      'Abstinence',
      'Withdrawal',
      'Rhythm or timing',
      'Male condoms',
      'Female condoms',
      'Minipill (progesterone-only pill',
      'Combined contraceptive pill (oestrogen & progesterone pill',
      'NuvaRing',
      'Implanon',
      'Depo Provera',
      'Copper IUD',
      'Mirena IUD',
      'Kyleena IUD',
      'Tubal ligation or removal of fallopian tubes',
      'Vasectomy',
    ],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'NO_FURTHER_QUESTIONS',
      },
    ],
  },
  {
    id: 26,
    questionText:
      'How many times have you had unprotected sex in the last month?',
    key: 'UNPROTECTED_MONTHLY_FREQUENCY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['1-2 times', '3-5 times', '5-10 times', '>10 times'],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'NO_FURTHER_QUESTIONS',
      },
    ],
  },
  {
    id: 27,
    questionText: 'What method have you been using to get pregnant?',
    key: 'PREGNANCY_ATTEMPT_METHOD',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: [
      'I have been trying naturally',
      'I have been undergoing artificial insemination (intrauterine insemination) only',
      'I have been undergoing ovulation induction (medications to assist with ovulation) only',
      'I have been undergoing ovulation induction (medications to assist with ovulation) plus artificial insemination (intrauterine insemination)',
      'I have been undergoing IVF (fresh cycle)',
      'I have been undergoing IVF (thaw cycle with frozen embryo transfer)',
    ],
    nextQuestions: [
      {
        onValue: 'I have been trying naturally',
        key: 'NATURAL_ATTEMPTS_LAST_MONTH',
      },
      {
        onValue:
          'I have been undergoing artificial insemination (intrauterine insemination) only',
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'INDICATED_CLINICAL_PREGNANCY',
          nextQuestions: [
            {
              onValue: 'Yes',
              key: 'TEST_TUBAL_PATENCY',
            },
            {
              onValue: 'No',
              key: 'NO_FURTHER_QUESTIONS',
            },
          ],
        },
      },
      {
        onValue:
          'I have been undergoing ovulation induction (medications to assist with ovulation) only',
        key: 'OVULATION_INDUCTION_MEDICATIONS',
      },
      {
        onValue:
          'I have been undergoing ovulation induction (medications to assist with ovulation) plus artificial insemination (intrauterine insemination)',
        key: 'OVULATION_INDUCTION_MEDICATIONS',
      },
      {
        onValue: 'I have been undergoing IVF (fresh cycle)',
        key: 'IVF_EGG_SOURCE',
      },
      {
        onValue:
          'I have been undergoing IVF (thaw cycle with frozen embryo transfer)',
        key: 'IVF_EGG_SOURCE',
      },
    ],
  },
  {
    id: 28,
    questionText: 'How many times have you had sex in the last month?',
    key: 'NATURAL_ATTEMPTS_LAST_MONTH',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'METHOD_HAVING_SEX',
      },
    ],
  },
  {
    id: 29,
    questionText: 'Did you use a method to try and time having sex?',
    key: 'METHOD_HAVING_SEX',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'NATURAL_ATTEMPT_STRATEGIES',
      },
      {
        onValue: 'No',
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'INDICATED_CLINICAL_PREGNANCY',
          nextQuestions: [
            {
              onValue: 'Yes',
              key: 'TEST_TUBAL_PATENCY',
            },
            {
              onValue: 'No',
              key: 'NO_FURTHER_QUESTIONS',
            },
          ],
        },
      },
    ],
  },
  {
    id: 30,
    questionText:
      'Which methods did you use to time having sex? (select all that apply)',
    key: 'NATURAL_ATTEMPT_STRATEGIES',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    values: [
      'Timing based on day of cycle',
      'Temperature monitoring',
      'Cervical mucus monitoring',
      'Urine LH testing kit',
      'Ultrasound tracking',
      'Other',
    ],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'INDICATED_CLINICAL_PREGNANCY',
          nextQuestions: [
            {
              onValue: 'Yes',
              key: 'TEST_TUBAL_PATENCY',
            },
            {
              onValue: 'No',
              key: 'NO_FURTHER_QUESTIONS',
            },
          ],
        },
      },
    ],
  },
  {
    id: 31,
    questionText:
      'What medication were you taking? (select all that apply for this month)',
    key: 'OVULATION_INDUCTION_MEDICATIONS',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    values: [
      'Letrozole',
      'Clomid',
      'FSH injections (e.g., daily injections with Puregonor Gonal F) ',
      'FSH+LH (e.g., Menopur, Pergoveris) or FSH+hCG injections (e.g., Puregon or Gonal F with small doses of Ovidrel)',
      'hCG "trigger" injection (e.g., single injection with Pregnyl, Ovidrel, or Ovitrell)',
    ],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
      },
    ],
  },
  {
    id: 32,
    questionText: 'What was the source of the eggs used during this cycle?',
    key: 'IVF_EGG_SOURCE',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['SELF', 'DONOR'],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'IVF_SPERM_SOURCE',
      },
    ],
  },
  {
    id: 33,
    questionText: 'What was the source of the sperm used during this cycle?',
    key: 'IVF_SPERM_SOURCE',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['PARENT', 'DONOR'],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'IVF_EMBRYO_TRANSFER_COUNT',
      },
    ],
  },
  {
    id: 34,
    questionText: 'How many embryos were transferred?',
    key: 'IVF_EMBRYO_TRANSFER_COUNT',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        decisionOnMetadata: {
          source: 'SERVER',
          key: 'INDICATED_CLINICAL_PREGNANCY',
          nextQuestions: [
            {
              onValue: 'Yes',
              key: 'TEST_TUBAL_PATENCY',
            },
            {
              onValue: 'No',
              key: 'NO_FURTHER_QUESTIONS',
            },
          ],
        },
      },
    ],
  },
  {
    id: 35,
    questionText:
      "Over the past 6-months, have you had any tests to determine tubal patency (i.e., whether or not the fallopian tubes are blocked)? This test can be performed by a special ultrasound or X-ray (where fluid/dye is passed through the cervix), or at the same time as a laproscopic surgery (referred to as 'dye studies')",
    key: 'TEST_TUBAL_PATENCY',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'TUBAL_PATENCY_TEST_LOCATION',
      },
      {
        onValue: 'No',
        key: 'SEMEN_ANALYSIS_PERFORMED',
      },
    ],
  },
  {
    id: 37,
    questionText:
      'Which hospital or radiology provider was this test performed?',
    key: 'TUBAL_PATENCY_TEST_LOCATION',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'TUBAL_PATENCY_TEST_RESULTS',
      },
    ],
  },
  {
    id: 38,
    questionText: 'What was the result?',
    key: 'TUBAL_PATENCY_TEST_RESULTS',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: [
      'Both fallopian tubes patent (not-blocked)',
      'One tube blocked ',
      'Both tubes blocked',
      'Unsure',
    ],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'SEMEN_ANALYSIS_PERFORMED',
      },
    ],
  },
  {
    id: 39,
    questionText: 'Do you know the result?',
    key: 'SEMEN_ANALYSIS_TEST_RESULTS',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Normal', 'Abnormal', 'Unsure'],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'SEMEN_ANALYSIS_TEST_LOCATION',
      },
    ],
  },
  {
    id: 40,
    questionText:
      'Which fertility practice or pathology provider was this test performed?',
    key: 'SEMEN_ANALYSIS_TEST_LOCATION',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'SEMEN_ANALYSIS_PARTNER_NAME',
      },
    ],
  },
  {
    id: 41,
    questionText: "Please provide your partner's name",
    key: 'SEMEN_ANALYSIS_PARTNER_NAME',
    doesValuePersist: true,
    responseType: 'TEXT',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'SEMEN_ANALYSIS_PARTNER_DOB',
      },
    ],
  },
  {
    id: 42,
    questionText:
      'Do you and your partner consent to the research team obtaining a copy of the result?',
    key: 'SEMEN_ANALYSIS_CONSENT_TO_RELEASE_RESULTS',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No'],
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'NO_FURTHER_QUESTIONS',
      },
    ],
  },
  {
    id: 43,
    questionText:
      'Over the past 6-months, has your partner had a semen analysis performed?',
    key: 'SEMEN_ANALYSIS_PERFORMED',
    doesValuePersist: true,
    responseType: 'RADIO',
    values: ['Yes', 'No', 'Not-Applicable'],
    nextQuestions: [
      {
        onValue: 'Yes',
        key: 'SEMEN_ANALYSIS_TEST_RESULTS',
      },
      {
        onValue: 'No',
        key: 'NO_FURTHER_QUESTIONS',
      },
      {
        onValue: 'Not-Applicable',
        key: 'NO_FURTHER_QUESTIONS',
      },
    ],
  },
  {
    id: 44,
    questionText: "Please provide your partner's dob",
    key: 'SEMEN_ANALYSIS_PARTNER_DOB',
    doesValuePersist: true,
    responseType: 'DATE',
    nextQuestions: [
      {
        onValue: '@@_NO_LOGIC_@@',
        key: 'SEMEN_ANALYSIS_CONSENT_TO_RELEASE_RESULTS',
      },
    ],
  },
  {
    id: 45,
    questionText: 'No further questions for this cycle. Thank you',
    key: 'NO_FURTHER_QUESTIONS',
    doesValuePersist: true,
    isEndOfSurvey: true,
  },
  {
    questionText:
      'We would recommend that you have a pelvic ultrasound 1-2 weeks after your missed menstrual period. This can be arranged through your GP. Please see your GP as soon as possible to obtain a referral.\n\nNo further questions for this cycle. Thank you.',
    key: 'RECOMMEND_PELVIC_ULTRASOUND',
    doesValuePersist: true,
    isEndOfSurvey: true,
    id: 46,
  },
  {
    questionText:
      'We understand answering this questionnaire may cause some distress. Please make contact with the study co-ordinator at your treatment site should you need any assistance or support\n\nNo further questions for this cycle. Thank you.',
    key: 'UNDERSTAND_CAUSE_DISTRESS',
    doesValuePersist: true,
    isEndOfSurvey: true,
    id: 47,
  },
]
export const getQuestions = () => {
  return questions
  // return client.get(EP.QUESTIONS()).then((res) => res.data)
}
