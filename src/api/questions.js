const questions = [
  {
    id: 1,
    key: 'HEIGHT',
    questionText: 'What is your height?',
    caption: '(cm)',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'SEX_BIRTH',
      },
    ],
    surveyId: 'surveyInit',
  },
  {
    id: 2,
    key: 'SEX_BIRTH',
    questionText: 'What was your gender/sex assigned at birth?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'GENDER',
      },
    ],
    values: [
      'Female',
      'Male',
      'Indeterminate / Intersex / Unspecified',
      'OTHER_SPECIFY',
    ],
    surveyId: 'All',
  },
  {
    id: 3,
    key: 'GENDER',
    questionText: 'What is your gender identity?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'CYCLE_LENGTH',
      },
    ],
    values: [
      'Female',
      'Male',
      'Indeterminate / Intersex / Unspecified',
      'OTHER_SPECIFY',
    ],
    surveyId: 'All',
  },
  {
    surveyId: 'surveyInit',
    id: 4,
    key: 'CYCLE_LENGTH',
    questionText: 'What is your usual cycle length?',
    caption:
      'This refers to the number of days counting from the first day of your period (Day 1) to the day before your next period started. You should report the cycle length that you have most of the time.',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'SHORTEST_CYCLE_LENGTH',
      },
    ],
  },
  {
    surveyId: 'surveyInit',
    id: 5,
    key: 'SHORTEST_CYCLE_LENGTH',
    questionText:
      'In your last 3 natural cycles (not including cycles where you had any fertility treatments or IVF), what was your shortest cycle length?',
    caption: '(days)',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'LONGEST_CYCLE_LENGTH',
      },
    ],
  },
  {
    surveyId: 'surveyInit',
    id: 6,
    key: 'LONGEST_CYCLE_LENGTH',
    questionText:
      'In your last 3 natural cycles (not including cycles where you had any fertility treatments or IVF), what was your longest cycle length?',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'FIRST_DAY_LAST_PERIOD',
      },
    ],
  },
  {
    id: 7,
    key: 'FIRST_DAY_LAST_PERIOD',
    questionText: 'What was the first day of your last period?',
    doesValuePersist: true,
    responseType: 'DATE',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'CURRENT_WEIGHT',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'WEIGHT_CHANGED',
          },
        ],
        onValue: '_VALUE_ANY',
        condition: 'c_previous_weight',
        goTo: 'c_previous_weight',
      },
    ],
    preFill: {
      extractFrom: 'SERVER',
      key: 'FIRST_DAY_LAST_PERIOD',
      caption: '(pre-filled from calendar)',
    },
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 8,
    key: 'WEIGHT_CHANGED',
    questionText:
      'Has your weight changed since your last study questionnaire?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'CURRENT_WEIGHT',
      },
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'REGULAR_MEDICATION',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'REGULAR_MEDICATION_CHANGED',
          },
        ],
        onValue: '_VALUE_FALSE',
        condition: 'c_previous_medication',
        goTo: 'c_previous_medication',
      },
    ],
  },
  {
    id: 9,
    key: 'CURRENT_WEIGHT',
    questionText: 'What is your current weight?',
    caption: '(kg)',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'REGULAR_MEDICATION',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'REGULAR_MEDICATION_CHANGED',
          },
        ],
        onValue: '_VALUE_ANY',
        condition: 'c_previous_medication',
        goTo: 'c_previous_medication',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 10,
    key: 'REGULAR_MEDICATION_CHANGED',
    questionText:
      'Have your regular medications changed since your last study questionnaire?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'REGULAR_MEDICATION',
      },
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'RELATIONSHIP_TYPE',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'RELATIONSHIP_STATUS_CHANGED',
          },
        ],
        onValue: '_VALUE_FALSE',
        condition: 'c_previous_relationship',
        goTo: 'c_previous_relationship',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 11,
    key: 'REGULAR_MEDICATION',
    questionText: 'What are your regular medications?',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'RELATIONSHIP_TYPE',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'RELATIONSHIP_STATUS_CHANGED',
          },
        ],
        onValue: '_VALUE_ANY',
        condition: 'c_previous_relationship',
        goTo: 'c_previous_relationship',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 12,
    key: 'RELATIONSHIP_STATUS_CHANGED',
    questionText:
      'Has your relationship status changed since your last study questionnaire?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'RELATIONSHIP_TYPE',
      },
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'SURGERY_ENDOMETRIOSIS',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'SURGERY_ENDOMETRIOSIS_SINCE_LAST_STUDY',
          },
        ],
        onValue: '_VALUE_FALSE',
        condition: 'c_surgery_history',
        goTo: 'c_surgery_history',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 13,
    key: 'RELATIONSHIP_TYPE',
    questionText:
      'What type of relationship, if any, are you currently part of?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: 'Single',
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'SURGERY_ENDOMETRIOSIS',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'SURGERY_ENDOMETRIOSIS_SINCE_LAST_STUDY',
          },
        ],
        condition: 'c_surgery_history',
        goTo: 'c_surgery_history',
      },
      {
        onValue: 'Heterosexual',
        goTo: 'CURRENT_PARTNER_SEX_BIRTH',
      },
      {
        onValue: 'Same Sex',
        goTo: 'CURRENT_PARTNER_SEX_BIRTH',
      },
      {
        onValue: 'Other (please specify)',
        goTo: 'CURRENT_PARTNER_SEX_BIRTH',
      },
    ],
    values: ['Single', 'Heterosexual', 'Same Sex', 'OTHER_SPECIFY'],
  },
  {
    surveyId: 'surveyA',
    id: 14,
    key: 'CURRENT_PARTNER_SEX_BIRTH',
    questionText:
      "What was your current partner's gender/sex assigned at birth?",
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'CURRENT_PARTNER_GENDER',
      },
    ],
    values: [
      'Female',
      'Male',
      'Indeterminate / Intersex / Unspecified',
      'OTHER_SPECIFY',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 15,
    key: 'CURRENT_PARTNER_GENDER',
    questionText: "What is your current partner's gender identity?",
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'SURGERY_ENDOMETRIOSIS',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'SURGERY_ENDOMETRIOSIS_SINCE_LAST_STUDY',
          },
        ],
        onValue: '_VALUE_ANY',
        condition: 'c_surgery_history',
        goTo: 'c_surgery_history',
      },
    ],
    values: [
      'Female',
      'Male',
      'Indeterminate / Intersex / Unspecified',
      'OTHER_SPECIFY',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 16,
    key: 'SURGERY_ENDOMETRIOSIS',
    questionText: 'Have you ever had surgery related to endometriosis?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'DATE_LAST_SURGERY',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 17,
    key: 'SURGERY_ENDOMETRIOSIS_SINCE_LAST_STUDY',
    questionText:
      'Have you had surgery related to endometriosis since your last study questionnaire?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'DATE_LAST_SURGERY',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'CURRENT_PREGNANT',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 18,
    key: 'DATE_LAST_SURGERY',
    questionText: 'What was the date of your last surgery?',
    doesValuePersist: true,
    responseType: 'DATE',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'HOSPITAL_SURGERY_PERFORMED',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 19,
    key: 'HOSPITAL_SURGERY_PERFORMED',
    questionText: 'At which hospital was the surgery performed?',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'SURGEON_PERFORMED_OPERATION',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 20,
    key: 'SURGEON_PERFORMED_OPERATION',
    questionText: 'Who was the surgeon that performed the operation?',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'CURRENT_PREGNANT',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 21,
    key: 'CURRENT_PREGNANT',
    questionText: 'Are you currently pregnant?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'ACTIVELY_TRYING_PREGNANT_2',
          },
          {
            onValue: '_VALUE_FALSE',
          },
        ],
        onValue: '_VALUE_TRUE',
        condition: 'c_partner_male',
        goTo: 'c_pregnancy_status_2',
      },
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'OUTCOME_RECENT_PREGNANCY',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'ACTIVELY_TRYING_PREGNANT',
          },
        ],
        onValue: '_VALUE_FALSE',
        condition: 'c_pregnancy_status',
        goTo: 'c_pregnancy_status_1',
      },
    ],
  },
  {
    id: 22,
    key: 'ACTIVELY_TRYING_PREGNANT',
    questionText: 'Have you been actively trying to get pregnant?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    goToOnEndOfNextSurvey: 'c_recruitment_date',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'TRYING_GET_PREGNANT',
      },
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'SEXUAL_ACTIVITY_SINCE_LAST_CYCLE',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'c_recruitment_date',
          },
        ],
        onValue: '_VALUE_FALSE',
        condition: 'c_partner_male',
        goTo: 'c_partner_male_1',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 23,
    key: 'SEXUAL_ACTIVITY_SINCE_LAST_CYCLE',
    questionText:
      'What best describes your sexual activity since your last cycle?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: 'I have not been sexually active',
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'TEST_TUBE_OPEN_BLOCKED',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'END_NO_FURTHER_QUESTIONS_TY',
          },
        ],
        condition: 'c_recruitment_date',
        goTo: 'c_recruitment_date',
      },
      {
        onValue: 'I have been using contraception',
        goTo: 'CONTRACEPTION_METHOD',
      },
      {
        onValue:
          'I have been having unprotected sex but not necessarily trying to get pregnant',
        goTo: 'UNPROTECTED_SEX_MALE_PARTNER',
      },
    ],
    values: [
      'I have not been sexually active',
      'I have been using contraception',
      'I have been having unprotected sex but not necessarily trying to get pregnant',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 24,
    key: 'CONTRACEPTION_METHOD',
    questionText:
      'What contraception methods have you and your partner been using?',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'TEST_TUBE_OPEN_BLOCKED',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'END_NO_FURTHER_QUESTIONS_TY',
          },
        ],
        onValue: '_VALUE_ANY',
        condition: 'c_recruitment_date',
        goTo: 'c_recruitment_date',
      },
    ],
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
  },
  {
    surveyId: 'surveyA',
    id: 25,
    key: 'UNPROTECTED_SEX_MALE_PARTNER',
    questionText:
      'How many times have you had unprotected sex with a male partner since your last period?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'TEST_TUBE_OPEN_BLOCKED',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'END_NO_FURTHER_QUESTIONS_TY',
          },
        ],
        onValue: '_VALUE_ANY',
        condition: 'c_recruitment_date',
        goTo: 'c_recruitment_date',
      },
    ],
    values: ['1-2 times', '3-5 times', '5-10 times', '>10 times'],
  },
  {
    surveyId: 'surveyA',
    id: 26,
    key: 'TEST_TUBE_OPEN_BLOCKED',
    questionText:
      'Over the past 6-months, have you had any tests to check if your tubes are open or blocked? This test can be performed by a special ultrasound or X-ray (where fluid/dye is passed through the cervix), or at time of laparoscopic surgery (called "dye studies")',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'WHERE_TEST_TUBES_TEST_PERFORMED',
      },
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'PARTNER_HAD_SEMEN_ANALYSIS',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'END_NO_FURTHER_QUESTIONS_TY',
          },
        ],
        onValue: '_VALUE_FALSE',
        condition: 'c_partner_male',
        goTo: 'c_partner_male_2',
      },
    ],
  },
  {
    id: 27,
    key: 'WHERE_TEST_TUBES_TEST_PERFORMED',
    questionText: 'Where was this test performed?',
    caption: '(which fertility practice or pathology provider)',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'TEST_TUBES_RESULT',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 28,
    key: 'TEST_TUBES_RESULT',
    questionText: 'What was the result?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        conditionNextQuestions: [
          {
            onValue: '_VALUE_TRUE',
            goTo: 'PARTNER_HAD_SEMEN_ANALYSIS',
          },
          {
            onValue: '_VALUE_FALSE',
            goTo: 'END_NO_FURTHER_QUESTIONS_TY',
          },
        ],
        onValue: '_VALUE_ANY',
        condition: 'c_partner_male',
        goTo: 'c_partner_male_2',
      },
    ],
    values: [
      'Both fallopian tubes patent (not-blocked)',
      'One tube blocked ',
      'Both tubes blocked',
      'Unsure',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 29,
    key: 'PARTNER_HAD_SEMEN_ANALYSIS',
    questionText:
      'Over the past 6-months, has your partner had a semen analysis performed?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'SEMEN_ANALYSIS_RESULT',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 30,
    key: 'SEMEN_ANALYSIS_RESULT',
    questionText: 'What were the results of the semen analysis?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'WHERE_SEMEN_ANALYSIS_TEST_PERFORMED',
      },
    ],
    values: ['Normal', 'Abnormal', 'Unsure', 'Result not yet known'],
  },
  {
    surveyId: 'surveyA',
    id: 31,
    key: 'WHERE_SEMEN_ANALYSIS_TEST_PERFORMED',
    questionText: 'Where was this test performed?',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'PARTNER_NAME',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 32,
    key: 'PARTNER_NAME',
    questionText: "What is your partner's name?",
    doesValuePersist: true,
    responseType: 'TEXT',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'PARTNER_DOB',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 33,
    key: 'PARTNER_DOB',
    questionText: "What is your partner's date of birth?",
    doesValuePersist: true,
    responseType: 'DATE',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'PARTNER_CONSENT_RESULT_COPY',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 34,
    key: 'PARTNER_CONSENT_RESULT_COPY',
    questionText:
      'Has your partner consented to the research team obtaining a copy of this result and signed a participant information and consent form?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'END_NO_FURTHER_QUESTIONS_TY',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'INFORM_PARTNER_WELCOME_CONTACT',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 35,
    key: 'INFORM_PARTNER_WELCOME_CONTACT',
    questionText:
      'Please inform your partner that they are welcome to contact the research team to provide consent for this result to be obtained.',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'END_NO_FURTHER_QUESTIONS_TY',
      },
    ],
  },
  {
    id: 36,
    key: 'END_NO_FURTHER_QUESTIONS_TY',
    questionText: 'No further questions for this cycle. Thank you',
    doesValuePersist: true,
    isEndOfSurvey: true,
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 37,
    key: 'OUTCOME_RECENT_PREGNANCY',
    questionText: 'What was the outcome of your most recent pregnancy?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue:
          'I had a positive pregnancy test (urine or blood) but I did not have a pregnancy confirmed on USS (Biochemical pregnancy)',
        goTo: 'END_NO_FURTHER_QUESTIONS_TY',
      },
      {
        onValue: 'had an ectopic pregnancy',
        goTo: 'ULTRASOUND_PREGNANCY',
      },
      {
        onValue: 'I had a miscarriage',
        goTo: 'WEEKS_PREGNANCY_ENDED',
      },
      {
        onValue: 'I had a termination of pregnancy',
        goTo: 'WEEKS_PREGNANCY_ENDED',
      },
      {
        onValue: 'I had a live birth',
        goTo: 'WEEKS_BABY_DELIVERED',
      },
      {
        onValue: 'I had a stillbirth',
        goTo: 'WEEKS_PREGNANCY_ENDED',
      },
    ],
    values: [
      'I had a positive pregnancy test (urine or blood) but I did not have a pregnancy confirmed on USS (Biochemical pregnancy)',
      'had an ectopic pregnancy',
      'I had a miscarriage',
      'I had a termination of pregnancy',
      'I had a live birth',
      'I had a stillbirth',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 38,
    key: 'WEEKS_BABY_DELIVERED',
    questionText: 'How many weeks were you when your baby was delivered?',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'HOW_BABY_DELIVERED',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 39,
    key: 'HOW_BABY_DELIVERED',
    questionText: 'How was the baby delivered?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'BABY_BIRTH_WEIGHT',
      },
    ],
    values: [
      'Vaginal birth (including forceps or vacuum delivery)',
      'Planned Caesarean (elective)',
      'Unplanned Caesarean (emergency)',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 40,
    key: 'BABY_BIRTH_WEIGHT',
    questionText: "What was the baby's birth weight?",
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'CONDITIONS_DIAGNOSED_PREGNANCY',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 41,
    key: 'CONDITIONS_DIAGNOSED_PREGNANCY',
    questionText:
      'Did you have any of the following conditions diagnosed during the pregnancy?',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    nextQuestions: [
      {
        goTo: 'CURRENTLY_BREASTFEEDING',
        onValue: '_VALUE_ANY',
      },
    ],
    values: [
      'Pre-eclampsia',
      'Gestational diabetes',
      'Placenta praevia',
      'Plecental abruption',
      'Bleeding in pregnancy (or antepartum haemorrhage) requiring admission to hospital',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 42,
    key: 'CURRENTLY_BREASTFEEDING',
    questionText: 'Are you currently breastfeeding?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'END_NO_FURTHER_QUESTIONS_TY',
      },
    ],
    values: [
      'No',
      'Yes, exclusively breastfeeding',
      'Yes, mixed breastfeeding',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 43,
    key: 'ULTRASOUND_PREGNANCY',
    questionText: 'Did you have an ultrasound during the pregnancy?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'IMAGING_PROVIDER',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'PREGNANCY_TREATMENT',
      },
    ],
  },
  {
    id: 44,
    key: 'IMAGING_PROVIDER',
    questionText: 'What was the imaging provider?',
    caption: '(e.g., Capitol Radiology, FMIG, MIA)',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'PREGNANCY_TREATMENT',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 45,
    key: 'PREGNANCY_TREATMENT',
    questionText: 'What treatment did you have?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: 'No treatment / spontaneous resolution',
        goTo: 'END_UNDERSTAND_DISTRESS',
      },
      {
        onValue: 'Methotrexate',
        goTo: 'END_UNDERSTAND_DISTRESS',
      },
      {
        onValue: 'Surgery',
        goTo: 'INFORMED_ENDOMETRIOSIS_SURGERY',
      },
    ],
    values: [
      'No treatment / spontaneous resolution',
      'Methotrexate',
      'Surgery',
    ],
  },
  {
    surveyId: 'surveyA',
    id: 46,
    key: 'INFORMED_ENDOMETRIOSIS_SURGERY',
    questionText:
      'Were you informed that there was endometriosis seen at the time of your surgery?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'END_UNDERSTAND_DISTRESS',
      },
    ],
  },
  {
    id: 47,
    key: 'END_UNDERSTAND_DISTRESS',
    questionText:
      'We understand answering this questionnaire may cause some distress. Please make contact with the study coordinator at your treatment site should you need any assistance or support.',
    doesValuePersist: true,
    isEndOfSurvey: true,
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 48,
    key: 'WEEKS_PREGNANCY_ENDED',
    questionText: 'How many weeks were you when the pregnancy ended?',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'END_UNDERSTAND_DISTRESS',
      },
    ],
  },
  {
    id: 49,
    key: 'ACTIVELY_TRYING_PREGNANT_2',
    questionText: 'Have you been actively trying to get pregnant?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    goToOnEndOfNextSurvey: 'END_CONTACT_1_MONTH',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'TRYING_GET_PREGNANT',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'USING_CONTRACEPTION',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 50,
    key: 'USING_CONTRACEPTION',
    questionText: 'Have you and your partner been using contraception?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'CONTRACEPTION_METHODS_2',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'UNPROTECTED_SEX_MALE_PARTNER_2',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 51,
    key: 'CONTRACEPTION_METHODS_2',
    questionText:
      'What contraception methods have you and your partner been using?',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'UNPROTECTED_SEX_MALE_PARTNER_2',
      },
    ],
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
  },
  {
    surveyId: 'surveyA',
    id: 52,
    key: 'UNPROTECTED_SEX_MALE_PARTNER_2',
    questionText:
      'Have you been having unprotected sex with a male partner, but not necessarily been trying to get pregnant?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'TIMES_UNPROTECTED_SEX_MALE_PARTNER_2',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'END_CONTACT_1_MONTH',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 53,
    key: 'TIMES_UNPROTECTED_SEX_MALE_PARTNER_2',
    questionText:
      'How many times have you had unprotected sex with a male partner since your last period?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'END_CONTACT_1_MONTH',
      },
    ],
    values: ['1-2 times', '3-5 times', '5-10 times', '>10 times'],
  },
  {
    surveyId: 'surveyA',
    id: 54,
    key: 'END_CONTACT_1_MONTH',
    questionText:
      'No further questions for this cycle. We will contact you again in 1 month. Thank you',
    doesValuePersist: true,
  },
  {
    id: 55,
    key: 'PREGNANCY_DUE_DATE',
    questionText: 'What is your pregnancy due date?',
    caption: 'Estimated Date of Delivery (EDD)',
    doesValuePersist: true,
    responseType: 'DATE',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'c_previous_ultrasound',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    id: 56,
    key: 'ULTRASOUND_CURRENT_PREGNANCY',
    questionText:
      'Have you had an ultrasound performed in the current pregnancy?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'IMAGING_PROVIDER_2',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'END_RECOMMEND_PELVIC_ULTRASOUND',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    id: 57,
    key: 'END_RECOMMEND_PELVIC_ULTRASOUND',
    questionText:
      'We would recommend that you have a pelvic ultrasound 1-2 weeks after your missed menstrual period. This can be arranged through your GP. Ask to see your  GP as soon as possible to obtain a referral.',
    doesValuePersist: true,
  },
  {
    surveyId: 'surveyA',
    id: 58,
    key: 'END_CONTACT_AGAIN_2_MONTHS',
    questionText:
      'No further questions for this cycle. We will contact you again in 2 months. Thank youen',
    doesValuePersist: true,
  },
  {
    surveyId: 'surveyA',
    id: 59,
    key: 'IMAGING_PROVIDER_2',
    questionText: 'What was the imaging provider? ',
    doesValuePersist: true,
    responseType: 'TEXTAREA',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'END_CONTACT_AGAIN_2_MONTHS',
      },
    ],
  },
  {
    surveyId: 'surveyA',
    key: 'c_previous_weight',
    type: 'SINGLE',
    isCondition: true,
    id: 60,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'PREVIOUS_WEIGHT',
        matchingStrategy: 'NULL/NOT_NULL',
        onValue: '_VALUE_NULL',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'CURRENT_WEIGHT',
      goToOnFalse: 'WEIGHT_CHANGED',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_previous_medication',
    type: 'SINGLE',
    isCondition: true,
    id: 61,
    conditions: [
      {
        variable: 'PREVIOUS_REGULAR_MEDICATION',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'NULL/NOT_NULL',
        onValue: '_VALUE_NULL',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'REGULAR_MEDICATION',
      goToOnFalse: 'REGULAR_MEDICATION_CHANGED',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_previous_relationship',
    type: 'SINGLE',
    isCondition: true,
    id: 62,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'PREVIOUS_RELATIONSHIP_DETAILS',
        matchingStrategy: 'NULL/NOT_NULL',
        onValue: '_VALUE_NULL',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'RELATIONSHIP_TYPE',
      goToOnFalse: 'RELATIONSHIP_STATUS_CHANGED',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_surgery_history',
    type: 'SINGLE',
    isCondition: true,
    id: 63,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'HAS_SURGICAL_HISTORY',
        matchingStrategy: 'NULL/NOT_NULL',
        onValue: '_VALUE_NULL',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'SURGERY_ENDOMETRIOSIS',
      goToOnFalse: 'SURGERY_ENDOMETRIOSIS_SINCE_LAST_STUDY',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_pregnancy_status_1',
    type: 'SINGLE',
    isCondition: true,
    id: 64,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'PREVIOUS_PREGNANCY_STATUS',
        matchingStrategy: 'TRUE/FALSE',
        onValue: '_VALUE_TRUE',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'OUTCOME_RECENT_PREGNANCY',
      goToOnFalse: 'ACTIVELY_TRYING_PREGNANT',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_partner_male_1',
    type: 'MULTI',
    isCondition: true,
    id: 65,
    conditions: [
      {
        variable: 'CURRENT_PARTNER_GENDER',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'EQUAL',
        onValue: 'MALE',
        logicalOperatorToNextQ: 'AND',
      },
      {
        variable: 'CURRENT_PARTNER_SEX_AT_BIRTH',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'EQUAL',
        onValue: 'MALE',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'SEXUAL_ACTIVITY_SINCE_LAST_CYCLE',
      goToOnFalse: 'c_recruitment_date',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_recruitment_date',
    type: 'MULTI',
    isCondition: true,
    id: 66,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'RECRUITMENT_DATE',
        matchingStrategy: 'TRUE/FALSE',
        onValue: '_VALUE_TRUE',
        logicalOperatorToNextQ: 'AND',
      },
      {
        variable: 'PREVIOUS_PREGNANCY_STATUS',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'TRUE/FALSE',
        onValue: '_VALUE_FALSE',
        logicalOperatorToNextQ: 'AND',
      },
      {
        variable: 'PREVIOUS_FERTILITY_DETAILS_DATE',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'NULL/NOT_NULL',
        onValue: '_VALUE_NULL',
        logicalOperatorToNextQ: 'OR',
      },
      {
        variable: 'PREVIOUS_FERTILITY_DETAILS_DATE',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'TRUE/FALSE',
        onValue: '_VALUE_TRUE',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'TEST_TUBE_OPEN_BLOCKED',
      goToOnFalse: 'END_NO_FURTHER_QUESTIONS_TY',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_pregnancy_date',
    type: 'SINGLE',
    isCondition: true,
    id: 67,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'PREVIOUS_PREGNANCY_DUE_DATE',
        matchingStrategy: 'NULL/NOT_NULL',
        onValue: '_VALUE_NULL',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'PREGNANCY_DUE_DATE',
      goToOnFalse: 'c_previous_ultrasound',
    },
  },
  {
    surveyId: 'surveyA',
    key: 'c_previous_ultrasound',
    type: 'SINGLE',
    isCondition: true,
    id: 68,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'PREVIOUS_ULTRASOUND_PERFORMED',
        matchingStrategy: 'TRUE/FALSE',
        onValue: '_VALUE_TRUE',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'END_CONTACT_AGAIN_2_MONTHS',
      goToOnFalse: 'ULTRASOUND_CURRENT_PREGNANCY',
    },
  },
  {
    key: 'c_pregnancy_ovulation',
    type: 'SINGLE',
    isCondition: true,
    id: 69,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'PREGNANCY_ATTEMPT_TYPE',
        matchingStrategy: 'EQUAL',
        onValue: 'OVULATION_INDUCTION',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'FERTILITY_MEDICATION_DURING_CYCLE',
      goToOnFalse: 'tunnel_to_breakpoint',
    },
    surveyId: 'All',
  },
  {
    surveyId: 'surveyA',
    key: 'c_partner_male_2',
    type: 'MULTI',
    isCondition: true,
    conditions: [
      {
        variable: 'CURRENT_PARTNER_GENDER',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'EQUAL',
        onValue: 'MALE',
        logicalOperatorToNextQ: 'AND',
      },
      {
        variable: 'CURRENT_PARTNER_SEX_AT_BIRTH',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'EQUAL',
        onValue: 'MALE',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'PARTNER_HAD_SEMEN_ANALYSIS',
      goToOnFalse: 'END_NO_FURTHER_QUESTIONS_TY',
    },
    id: 70,
  },
  {
    surveyId: 'surveyA',
    key: 'c_partner_male_3',
    type: 'MULTI',
    isCondition: true,
    conditionalNext: {
      goToOnTrue: 'ACTIVELY_TRYING_PREGNANT_2',
      goToOnFalse: 'END_NO_FURTHER_QUESTIONS_TY',
    },
    conditions: [
      {
        variable: 'CURRENT_PARTNER_GENDER',
        extractValueFrom: 'SERVER',
        logicalOperatorToNextQ: 'AND',
        matchingStrategy: 'EQUAL',
        onValue: 'MALE',
      },
      {
        variable: 'CURRENT_PARTNER_SEX_AT_BIRTH',
        extractValueFrom: 'SERVER',
        matchingStrategy: 'EQUAL',
        onValue: 'MALE',
      },
    ],
    id: 71,
  },
  {
    surveyId: 'surveyA',
    key: 'c_pregnancy_status_2',
    type: 'SINGLE',
    isCondition: true,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'PREVIOUS_PREGNANCY_STATUS',
        matchingStrategy: 'TRUE/FALSE',
        onValue: '_VALUE_TRUE',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'c_pregnancy_date',
      goToOnFalse: 'c_partner_male_3',
    },
    id: 72,
  },
  {
    id: 73,
    key: 'TRYING_GET_PREGNANT',
    questionText: 'How have you been trying to get pregnant?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: 'I have been trying naturally',
        goTo: 'TIMES_UNPROTECTED_SEX_MALE_PARTNER_3',
      },
      {
        onValue:
          'I have been undergoing artificial insemination (intrauterine insemination) in a natural cycle',
        goTo: 'FERTILITY_MEDICATION_DURING_CYCLE',
      },
      {
        onValue:
          'I have been undergoing ovulation induction (medications to assist with ovulation) only',
        goTo: 'FERTILITY_MEDICATION_DURING_CYCLE',
      },
      {
        onValue:
          'I have been undergoing ovulation induction (medications to assist with ovulation) plus artificial insemination (intrauterine insemination)',
        goTo: 'TIMES_UNPROTECTED_SEX_MALE_PARTNER_3',
      },
      {
        onValue:
          'I have been undergoing IVF (stimulation cycle plus fresh embryo transfer)',
        goTo: 'EMBRYO_DONOR_EGG_2',
      },
      {
        onValue: 'I have been undergoing IVF (frozen embryo transfer cycle)',
        goTo: 'EMBRYO_DONOR_EGG',
      },
    ],
    values: [
      'I have been trying naturally',
      'I have been undergoing artificial insemination (intrauterine insemination) in a natural cycle',
      'I have been undergoing ovulation induction (medications to assist with ovulation) only',
      'I have been undergoing ovulation induction (medications to assist with ovulation) plus artificial insemination (intrauterine insemination)',
      'I have been undergoing IVF (stimulation cycle plus fresh embryo transfer)',
      'I have been undergoing IVF (frozen embryo transfer cycle)',
    ],
    surveyId: 'surveyB',
  },
  {
    id: 74,
    key: 'TIMES_UNPROTECTED_SEX_MALE_PARTNER_3',
    questionText:
      'How many times have you had unprotected sex with a male partner since your last period?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'IS_METHOD_SEX_WITH_OVULATION',
      },
    ],
    values: ['1-2 Times', ' 3-5 Times', ' 5-10 Times', ' >10 Times'],
    surveyId: 'surveyB',
  },
  {
    id: 75,
    key: 'IS_METHOD_SEX_WITH_OVULATION',
    questionText:
      'Did you use a method to try and time having sex with ovulation?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'USE_METHODS_SEX_WITH_OVULATION',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'c_pregnancy_ovulation',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    id: 76,
    key: 'USE_METHODS_SEX_WITH_OVULATION',
    questionText:
      'Which methods did you use to time having sex with ovulation?',
    caption: '(Select all that apply)',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'c_pregnancy_ovulation',
      },
    ],
    values: [
      'Timing based on day of cycle',
      'Temperature monitoring',
      'Cervical mucus monitoring',
      'Urine LH testing kit',
      'Ultrasound tracking',
      'OTHER_SPECIFY',
    ],
    surveyId: 'surveyB',
  },
  {
    id: 77,
    key: 'FERTILITY_MEDICATION_DURING_CYCLE',
    questionText:
      'Were you taking any fertility medications during this cycle?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'FERTILITY_MEDICATION_LIST_3',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'tunnel_to_breakpoint',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    id: 78,
    key: 'FERTILITY_MEDICATION_LIST_3',
    questionText: 'What medications were you taking?',
    doesValuePersist: true,
    isEndOfSurvey: false,
    responseType: 'CHECKBOX',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'tunnel_to_breakpoint',
      },
    ],
    preFill: {},
    values: [
      'Letrozole',
      'Clomid',
      'FSH injections (e.g., daily injections with Puregon or Gonal F)',
      'FSH + LH (e.g., Menopur, Pergoveris) or FSH + hCG injections (e.g., Puregon or Gonal F with small doses of Ovidrel)',
      'hCG "trigger" injection (e.g., single injection with Pregnyl, Ovidrel, or Ovitrell)',
    ],
    surveyId: 'All',
  },
  {
    id: 79,
    key: 'EMBRYO_DONOR_EGG',
    questionText: "Was this embryo created using your egg or a donor's egg?",
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'FERTILITY_MEDICATION',
      },
    ],
    values: ['Own egg', "Donor's egg "],
    surveyId: 'surveyB',
  },
  {
    id: 80,
    key: 'FERTILITY_MEDICATION',
    questionText:
      'Were you taking any fertility medications during this cycle or after the embryo transfer?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'FERTILITY_MEDICATION_LIST',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'EMBRYO_DONOR_SPERM',
      },
    ],
    surveyId: 'surveyB',
  },
  {
    id: 81,
    key: 'FERTILITY_MEDICATION_LIST',
    questionText: 'What medications were you taking?',
    caption: '(Select all that apply for this cycle)',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'EMBRYO_DONOR_SPERM',
      },
    ],
    values: [
      'FSH injections (e.g., daily injections with Puregon, Gonal F, Bemfola, Rekovelle, Elonva)',
      'FSH + LH (e.g., Menopur, Pergoveris, Puregon or Gonal F + Luveris)',
      'hCG "trigger" injection (e.g., single injection with Pregnyl, Ovidrel, or Ovitrelle)',
      'Oestrogen Tablts (e.g., Progynova) or patches (e.g., Climara)',
      'Progesterone pessaries (e.g., Crinone, Oripro, Endometrin, Utrogestan)',
      'Subcutaneous progesterone injection (e.g., Prolutex)',
      'Intramuscular progesterone injection',
    ],
    surveyId: 'surveyB',
  },
  {
    id: 82,
    key: 'EMBRYO_DONOR_EGG_2',
    questionText: "Was this embryo created using your egg or a donor's egg?",
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: 'Own egg',
        goTo: 'FERTILITY_MEDICATION_LIST_2',
      },
      {
        onValue: " Donor's egg",
        goTo: 'EMBRYO_DONOR_SPERM',
      },
    ],
    values: ['Own egg', " Donor's egg"],
    surveyId: 'surveyB',
  },
  {
    id: 83,
    key: 'FERTILITY_MEDICATION_LIST_2',
    questionText: 'What medication were you taking?',
    caption: '(Select all that apply for this cycle)',
    doesValuePersist: true,
    responseType: 'CHECKBOX',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'EMBRYO_DONOR_SPERM',
      },
    ],
    values: [
      'FSH injections (e.g., daily injections with Puregon, Gonal F, Bemfola, Rekovelle, Elonva)',
      'FSH + LH (e.g., Menopur, Pergoveris, Puregon or Gonal F + Luveris)',
      'GnRH antagonist injections (e.g., orgalutran, cetrotide)',
      'GnRH agonist (e.g., Synarel, Zoladex)',
      'hCG "trigger" injection (e.g., single injection with Pregnyl, Ovidrel, or Ovitrelle)',
      'GnRH agonist "trigger" injection (e.g., Lucrin, Decapeptyl)',
      'Progesterone pessaries (e.g., Crinone, Oripro, Endometrin, Utrogestan)',
      'Subcutaneous progesterone injection (e.g., Prolutex)',
      'Intramuscular progesterone injection',
    ],
    surveyId: 'surveyB',
  },
  {
    id: 84,
    key: 'EMBRYO_DONOR_SPERM',
    questionText:
      "Were the sperm used in this cycle your partner's sperm or a donor's sperm?",
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'WERE_EMBRYOS_CREATED',
      },
    ],
    preFill: {},
    values: ["Partner's sperm", " Donor's sperm"],
    surveyId: 'All',
  },
  {
    id: 85,
    key: 'EMBRYO_TRANSFER',
    questionText: 'Did you have an embryo transfer?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'NUMBER_EMBRYO_TRANSFERRED',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'WHY_NO_EMBRYO_TRANSFERRED',
      },
    ],
    surveyId: 'surveyB',
  },
  {
    id: 86,
    key: 'NUMBER_EMBRYO_TRANSFERRED',
    questionText: 'How many embryos were transferred?',
    doesValuePersist: true,
    responseType: 'NUMBER',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'tunnel_to_breakpoint',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    id: 87,
    key: 'WHY_NO_EMBRYO_TRANSFERRED',
    questionText: 'Why were no embryos transferred?',
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: '_VALUE_ANY',
        goTo: 'tunnel_to_breakpoint',
      },
    ],
    preFill: {},
    values: [
      'I was having genetic testing performed on the embryos (e.g., Pre-implantation Genetic Testing (PGT))',
      'There was a medical reason that I was unable to have an embryo transfer (e.g., Ovarian Hyperstimulation Syndrome (OHSS))',
      'There were no embryos available for embryo transfer',
      'I chose not to have an embryo transfer this cycle',
      'OTHER_SPECIFY',
    ],
    surveyId: 'All',
  },
  {
    key: 'WERE_EGGS_OWN_DONOR',
    questionText:
      "Were the eggs used in this cycle your own eggs or donor's eggs?",
    doesValuePersist: true,
    responseType: 'RADIO',
    nextQuestions: [
      {
        onValue: 'Own eggs',
        goTo: 'FERTILITY_MEDICATION_LIST_2',
      },
      {
        onValue: "Donor's egg",
        goTo: 'EMBRYO_DONOR_SPERM',
      },
    ],
    preFill: {},
    values: ['Own eggs', "Donor's egg"],
    surveyId: 'All',
    id: 88,
  },
  {
    id: 89,
    key: 'WERE_EMBRYOS_CREATED',
    questionText: 'Were any embryos created this cycle?',
    doesValuePersist: true,
    responseType: 'BOOLEAN',
    nextQuestions: [
      {
        onValue: '_VALUE_TRUE',
        goTo: 'EMBRYO_TRANSFER',
      },
      {
        onValue: '_VALUE_FALSE',
        goTo: 'END_NO_FURTHER_QUESTIONS_TY',
      },
    ],
    preFill: {},
    surveyId: 'All',
  },
  {
    key: 'c_first_survey',
    type: 'SINGLE',
    isCondition: true,
    conditions: [
      {
        extractValueFrom: 'SERVER',
        variable: 'FIRST_SURVEY',
        matchingStrategy: 'TRUE/FALSE',
        onValue: 'VALUE_TRUE',
      },
    ],
    conditionalNext: {
      goToOnTrue: 'HEIGHT',
      goToOnFalse: 'FIRST_DAY_LAST_PERIOD',
    },
    surveyId: 'All',
    id: 90,
  },
  {
    key: 'tunnel_to_breakpoint',
    type: 'TUNNEL',
    isTunnel: true,
    surveyId: 'All',
    id: 91,
  },
]

export const getQuestions = () => {
  return questions
}
