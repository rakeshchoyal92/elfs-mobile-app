// const questionsApi = [
//   {
//     key: 'c_first_survey_1',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 90,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'first_survey',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'height',
//       goToOnFalse: 'first_day_last_period',
//     },
//     surveyId: 'All',
//   },
//   {
//     id: 1,
//     key: 'height',
//     questionText: 'What is your height?',
//     caption: '(cm)',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'sex_birth',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 2,
//     key: 'sex_birth',
//     questionText: 'What was your gender/sex assigned at birth?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'gender',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Female',
//       'Male',
//       'Indeterminate / Intersex / Unspecified',
//       'OTHER_SPECIFY',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 3,
//     key: 'gender',
//     questionText: 'What is your gender identity?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'cycle_length',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Female',
//       'Male',
//       'Indeterminate / Intersex / Unspecified',
//       'OTHER_SPECIFY',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 4,
//     key: 'cycle_length',
//     questionText: 'What is your usual cycle length?',
//     caption:
//       'This refers to the number of days counting from the first day of your period (Day 1) to the day before your next period started. You should report the cycle length that you have most of the time.',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'shortest_cycle_length',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 5,
//     key: 'shortest_cycle_length',
//     questionText:
//       'In your last 3 natural cycles (not including cycles where you had any fertility treatments or IVF), what was your shortest cycle length?',
//     caption: '(days)',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'longest_cycle_length',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 6,
//     key: 'longest_cycle_length',
//     questionText:
//       'In your last 3 natural cycles (not including cycles where you had any fertility treatments or IVF), what was your longest cycle length?',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'first_day_last_period',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 7,
//     key: 'first_day_last_period',
//     questionText: 'What was the first day of your last period?',
//     doesValuePersist: true,
//     responseType: 'DATE',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_previous_weight',
//       },
//     ],
//     preFill: {
//       extractFrom: 'SERVER',
//       key: 'first_day_last_period',
//       caption: '(pre-filled from calendar)',
//     },
//     showMetaDataKey: 'first_day_last_period',
//     surveyId: 'All',
//   },
//   {
//     id: 8,
//     key: 'weight_changed',
//     questionText:
//       'Has your weight changed since your last study questionnaire?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'current_weight',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_previous_medication',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 9,
//     key: 'current_weight',
//     questionText: 'What is your current weight?',
//     caption: '(kg)',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_previous_medication',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 10,
//     key: 'regular_medication_changed',
//     questionText:
//       'Have your regular medications changed since your last study questionnaire?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'regular_medication',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_previous_relationship',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 11,
//     key: 'regular_medication',
//     questionText: 'What are your regular medications?',
//     doesValuePersist: true,
//     responseType: 'TEXTAREA',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_previous_relationship',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 12,
//     key: 'relationship_status_changed',
//     questionText:
//       'Has your relationship status changed since your last study questionnaire?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'relationship_type',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_surgery_history',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 13,
//     key: 'relationship_type',
//     questionText:
//       'What type of relationship, if any, are you currently part of?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: 'Single',
//         goTo: 'c_surgery_history',
//       },
//       {
//         onValue: 'Heterosexual',
//         goTo: 'current_partner_sex_birth',
//       },
//       {
//         onValue: 'Same Sex',
//         goTo: 'current_partner_sex_birth',
//       },
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'current_partner_sex_birth',
//       },
//     ],
//     preFill: {},
//     values: ['Single', 'Heterosexual', 'Same Sex', 'OTHER_SPECIFY'],
//     surveyId: 'All',
//   },
//   {
//     id: 14,
//     key: 'current_partner_sex_birth',
//     questionText:
//       "What was your current partner's gender/sex assigned at birth?",
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'current_partner_gender',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Female',
//       'Male',
//       'Indeterminate / Intersex / Unspecified',
//       'OTHER_SPECIFY',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 15,
//     key: 'current_partner_gender',
//     questionText: "What is your current partner's gender identity?",
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_surgery_history',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Female',
//       'Male',
//       'Indeterminate / Intersex / Unspecified',
//       'OTHER_SPECIFY',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 16,
//     key: 'surgery_endometriosis',
//     questionText: 'Have you ever had surgery related to endometriosis?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'current_pregnant',
//       },
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'date_last_surgery',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 17,
//     key: 'surgery_endometriosis_since_last_study',
//     questionText:
//       'Have you had surgery related to endometriosis since your last study questionnaire?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'current_pregnant',
//       },
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'date_last_surgery',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 18,
//     key: 'date_last_surgery',
//     questionText: 'What was the date of your last surgery?',
//     doesValuePersist: true,
//     responseType: 'DATE',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'hospital_surgery_performed',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 19,
//     key: 'hospital_surgery_performed',
//     questionText: 'At which hospital was the surgery performed?',
//     doesValuePersist: true,
//     responseType: 'TEXTAREA',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'surgeon_performed_operation',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 20,
//     key: 'surgeon_performed_operation',
//     questionText: 'Who was the surgeon that performed the operation?',
//     doesValuePersist: true,
//     responseType: 'TEXTAREA',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'current_pregnant',
//       },
//     ],
//     optionalSkipText: 'I do not know the name of the surgeon',
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 21,
//     key: 'current_pregnant',
//     questionText: 'Are you currently pregnant?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'c_pregnancy_status_2',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_pregnancy_status_1',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 22,
//     key: 'actively_trying_pregnant',
//     questionText: 'Were you actively trying to get pregnant?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'tunnel_b2',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'using_contraception',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     surveyId: 'surveyA',
//     id: 23,
//     key: 'sexual_activity_since_last_cycle',
//     questionText:
//       'What best describes your sexual activity since your last cycle?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     values: [
//       'I have not been sexually active',
//       'I have been using contraception',
//       'I have been having unprotected sex but not necessarily trying to get pregnant',
//     ],
//   },
//   {
//     id: 24,
//     key: 'contraception_method',
//     questionText:
//       'What contraception methods have you and your partner been using?',
//     caption: '(Select all that apply)',
//     doesValuePersist: true,
//     responseType: 'CHECKBOX',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'times_unprotected_sex_male_partner_2',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Withdrawal',
//       'Rhythm or timing',
//       'Male condoms',
//       'Female condoms',
//       'Minipill (progesterone-only pill',
//       'Combined contraceptive pill (oestrogen & progesterone pill',
//       'NuvaRing',
//       'Implanon',
//       'Depo Provera',
//       'Copper IUD',
//       'Mirena IUD',
//       'Kyleena IUD',
//       'Tubal ligation or removal of fallopian tubes',
//       'Vasectomy',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 25,
//     key: 'unprotected_sex_male_partner',
//     questionText:
//       'How many times have you had unprotected sex with a male partner since your last period?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_no_further_questions_ty',
//       },
//     ],
//     preFill: {},
//     values: ['1-2 times', '3-5 times', '5-10 times', '>10 times'],
//     surveyId: 'All',
//   },
//   {
//     id: 28,
//     key: 'test_tubes_result',
//     questionText: 'What was the result?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_partner_male_2',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Both fallopian tubes patent (not-blocked)',
//       'One tube blocked ',
//       'Both tubes blocked',
//       'Unsure',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 29,
//     key: 'partner_had_semen_analysis',
//     questionText: 'Has your partner had a semen analysis performed?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'semen_analysis_result',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 30,
//     key: 'semen_analysis_result',
//     questionText: 'What were the results of the semen analysis?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'where_semen_analysis_test_performed',
//       },
//     ],
//     preFill: {},
//     values: ['Normal', 'Abnormal', 'Unsure', 'Result not yet known'],
//     surveyId: 'All',
//   },
//   {
//     id: 31,
//     key: 'where_semen_analysis_test_performed',
//     questionText: 'Where was this test performed?',
//     doesValuePersist: true,
//     responseType: 'TEXTAREA',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'partner_name',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 32,
//     key: 'partner_name',
//     questionText: "What is your partner's name?",
//     doesValuePersist: true,
//     responseType: 'TEXT',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'partner_dob',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 33,
//     key: 'partner_dob',
//     questionText: "What is your partner's date of birth?",
//     doesValuePersist: true,
//     responseType: 'DATE',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'partner_consent_result_copy',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 34,
//     key: 'partner_consent_result_copy',
//     questionText:
//       'Has your partner consented to the research team obtaining a copy of this result and signed a participant information and consent form?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'return_to_tunnel',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'inform_partner_welcome_contact',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 35,
//     key: 'inform_partner_welcome_contact',
//     questionText:
//       'Please inform your partner that they are welcome to contact the research team to provide consent for this result to be obtained.',
//     doesValuePersist: true,
//     isEndOfSurvey: false,
//     responseType: 'LABEL',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 36,
//     key: 'end_no_further_questions_ty',
//     questionText: 'No further questions for this cycle. Thank you',
//     doesValuePersist: true,
//     isEndOfSurvey: true,
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 37,
//     key: 'outcome_recent_pregnancy',
//     questionText: 'What was the outcome of your most recent pregnancy?',
//     caption: '(You indicated you were pregnant on your last questionnaire)',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue:
//           'I had a positive pregnancy test (urine or blood) but I did not have a pregnancy confirmed on USS (Biochemical pregnancy)',
//         goTo: 'end_understand_distress',
//       },
//       {
//         onValue: 'had an ectopic pregnancy',
//         goTo: 'ultrasound_pregnancy',
//       },
//       {
//         onValue: 'I had a miscarriage',
//         goTo: 'weeks_pregnancy_ended',
//       },
//       {
//         onValue: 'I had a termination of pregnancy',
//         goTo: 'weeks_pregnancy_ended',
//       },
//       {
//         onValue: 'I had a live birth',
//         goTo: 'weeks_baby_delivered',
//       },
//       {
//         onValue: 'I had a stillbirth',
//         goTo: 'weeks_pregnancy_ended',
//       },
//     ],
//     preFill: {},
//     values: [
//       'I had a positive pregnancy test (urine or blood) but I did not have a pregnancy confirmed on USS (Biochemical pregnancy)',
//       'had an ectopic pregnancy',
//       'I had a miscarriage',
//       'I had a termination of pregnancy',
//       'I had a live birth',
//       'I had a stillbirth',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 38,
//     key: 'weeks_baby_delivered',
//     questionText: 'How many weeks were you when your baby was delivered?',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'how_baby_delivered',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 39,
//     key: 'how_baby_delivered',
//     questionText: 'How was the baby delivered?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'baby_birth_weight',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Vaginal birth (including forceps or vacuum delivery)',
//       'Planned Caesarean (elective)',
//       'Unplanned Caesarean (emergency)',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 40,
//     key: 'baby_birth_weight',
//     questionText: "What was the baby's birth weight?",
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'conditions_diagnosed_pregnancy',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 41,
//     key: 'conditions_diagnosed_pregnancy',
//     questionText:
//       'Did you have any of the following conditions diagnosed during the pregnancy?',
//     doesValuePersist: true,
//     responseType: 'CHECKBOX',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'currently_breastfeeding',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Pre-eclampsia',
//       'Gestational diabetes',
//       'Placenta praevia',
//       'Plecental abruption',
//       'Bleeding in pregnancy (or antepartum haemorrhage) requiring admission to hospital',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 42,
//     key: 'currently_breastfeeding',
//     questionText: 'Are you currently breastfeeding?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_contact_research_assistant',
//       },
//     ],
//     preFill: {},
//     values: [
//       'No',
//       'Yes, exclusively breastfeeding',
//       'Yes, mixed breastfeeding',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 43,
//     key: 'ultrasound_pregnancy',
//     questionText: 'Did you have an ultrasound during the pregnancy?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'imaging_provider_2',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'pregnancy_treatment',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 44,
//     key: 'imaging_provider',
//     questionText: 'What was the imaging provider?',
//     caption: '(e.g., Capitol Radiology, FMIG, MIA)',
//     doesValuePersist: true,
//     responseType: 'TEXTAREA',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_contact_again_2_months',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 45,
//     key: 'pregnancy_treatment',
//     questionText: 'What treatment did you have?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: 'No treatment / spontaneous resolution',
//         goTo: 'end_understand_distress',
//       },
//       {
//         onValue: 'Methotrexate',
//         goTo: 'end_understand_distress',
//       },
//       {
//         onValue: 'Surgery',
//         goTo: 'informed_endometriosis_surgery',
//       },
//     ],
//     preFill: {},
//     values: [
//       'No treatment / spontaneous resolution',
//       'Methotrexate',
//       'Surgery',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 46,
//     key: 'informed_endometriosis_surgery',
//     questionText:
//       'Were you informed that there was endometriosis seen at the time of your surgery?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_understand_distress',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 47,
//     key: 'end_understand_distress',
//     questionText:
//       'We understand answering this questionnaire may cause some distress. Please make contact with the study coordinator at your treatment site should you need any assistance or support.',
//     doesValuePersist: true,
//     isEndOfSurvey: false,
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_no_further_questions_ty',
//       },
//     ],
//     preFill: {},
//     responseType: 'LABEL',
//     surveyId: 'All',
//   },
//   {
//     id: 48,
//     key: 'weeks_pregnancy_ended',
//     questionText: 'How many weeks were you when the pregnancy ended?',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_understand_distress',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 49,
//     key: 'actively_trying_pregnant_2',
//     questionText: 'Have you been actively trying to get pregnant?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'c_tubal_performed_previously',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_partner_male_1',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 50,
//     key: 'using_contraception',
//     questionText: 'Have you and your partner been using contraception?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'contraception_method',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'end_contact_1_month',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 51,
//     key: 'contraception_methods_2',
//     questionText:
//       'What contraception methods have you and your partner been using?',
//     doesValuePersist: true,
//     responseType: 'CHECKBOX',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'unprotected_sex_male_partner',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Abstinence',
//       'Withdrawal',
//       'Rhythm or timing',
//       'Male condoms',
//       'Female condoms',
//       'Minipill (progesterone-only pill',
//       'Combined contraceptive pill (oestrogen & progesterone pill',
//       'NuvaRing',
//       'Implanon',
//       'Depo Provera',
//       'Copper IUD',
//       'Mirena IUD',
//       'Kyleena IUD',
//       'Tubal ligation or removal of fallopian tubes',
//       'Vasectomy',
//     ],
//     surveyId: 'All',
//   },
//   {
//     surveyId: 'surveyA',
//     id: 52,
//     key: 'unprotected_sex_male_partner_2',
//     questionText:
//       'Have you been having unprotected sex with a male partner, but not necessarily been trying to get pregnant?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//   },
//   {
//     id: 53,
//     key: 'times_unprotected_sex_male_partner_2',
//     questionText:
//       'How many times have you had unprotected sex with a male partner since your last period?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_contact_1_month',
//       },
//     ],
//     preFill: {},
//     values: ['1-2 times', '3-5 times', '5-10 times', '>10 times'],
//     surveyId: 'All',
//   },
//   {
//     id: 56,
//     key: 'ultrasound_current_pregnancy',
//     questionText:
//       'Have you had an ultrasound performed in the current pregnancy?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'imaging_provider',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'end_recommend_pelvic_ultrasound',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 57,
//     key: 'end_recommend_pelvic_ultrasound',
//     questionText:
//       'We would recommend that you have a pelvic ultrasound 1-2 weeks after your missed menstrual period. This can be arranged through your GP. Ask to see your  GP as soon as possible to obtain a referral.',
//     doesValuePersist: true,
//     responseType: 'LABEL',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'end_contact_again_2_months',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 58,
//     key: 'end_contact_again_2_months',
//     questionText:
//       'No further questions for this cycle. We will contact you again in 2 months. Thank you',
//     doesValuePersist: true,
//     isEndOfSurvey: true,
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 59,
//     key: 'imaging_provider_2',
//     questionText: 'What was the imaging provider? ',
//     doesValuePersist: true,
//     responseType: 'TEXTAREA',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'pregnancy_treatment',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     key: 'c_previous_weight',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 60,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'previous_weight',
//         matchingStrategy: 'NULL/NOT_NULL',
//         onValue: '_VALUE_NULL',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'current_weight',
//       goToOnFalse: 'weight_changed',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_previous_medication',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 61,
//     conditions: [
//       {
//         variable: 'previous_regular_medication',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'NULL/NOT_NULL',
//         onValue: '_VALUE_NULL',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'regular_medication',
//       goToOnFalse: 'regular_medication_changed',
//     },
//     surveyId: 'All',
//   },
//   {
//     surveyId: 'surveyA',
//     key: 'c_previous_relationship',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 62,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'previous_relationship_details',
//         matchingStrategy: 'NULL/NOT_NULL',
//         onValue: '_VALUE_NULL',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'relationship_type',
//       goToOnFalse: 'relationship_status_changed',
//     },
//   },
//   {
//     key: 'c_surgery_history',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 63,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'has_surgical_history',
//         matchingStrategy: 'NULL/NOT_NULL',
//         onValue: '_VALUE_NULL',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'surgery_endometriosis',
//       goToOnFalse: 'surgery_endometriosis_since_last_study',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_pregnancy_status_1',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 64,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'previous_pregnancy_status',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'outcome_recent_pregnancy',
//       goToOnFalse: 'actively_trying_pregnant_2',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_partner_male_1',
//     type: 'MULTI',
//     isCondition: true,
//     id: 65,
//     conditions: [
//       {
//         variable: 'current_partner_gender',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'EQUAL',
//         onValue: 'Male',
//         logicalOperatorToNextQ: 'AND',
//       },
//       {
//         variable: 'current_partner_sex_birth',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'EQUAL',
//         onValue: 'Male',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'sexually_active_since_last_period',
//       goToOnFalse: 'end_no_further_questions_ty',
//     },
//     surveyId: 'All',
//   },
//   {
//     surveyId: 'surveyA',
//     key: 'c_recruitment_date',
//     type: 'MULTI',
//     isCondition: true,
//     id: 66,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'recruitment_date',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//         logicalOperatorToNextQ: 'AND',
//       },
//       {
//         variable: 'previous_pregnancy_status',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_FALSE',
//         logicalOperatorToNextQ: 'AND',
//       },
//       {
//         variable: 'previous_fertility_details_date',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'NULL/NOT_NULL',
//         onValue: '_VALUE_NULL',
//         logicalOperatorToNextQ: 'OR',
//       },
//       {
//         variable: 'previous_fertility_details_date',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'check_tubes_open_blocked',
//       goToOnFalse: 'end_no_further_questions_ty',
//     },
//   },
//   {
//     key: 'c_pregnancy_date',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 67,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'previous_pregnancy_due_date',
//         matchingStrategy: 'NULL/NOT_NULL',
//         onValue: '_VALUE_NULL',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'pregnancy_due_date',
//       goToOnFalse: 'c_previous_ultrasound',
//     },
//     surveyId: 'All',
//   },
//   {
//     surveyId: 'surveyA',
//     key: 'c_previous_ultrasound',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 68,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'previous_ultrasound_performed',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'end_contact_again_2_months',
//       goToOnFalse: 'ultrasound_current_pregnancy',
//     },
//   },
//   {
//     key: 'c_pregnancy_attempt_type_ovulation',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 69,
//     conditions: [
//       {
//         extractValueFrom: 'SURVEY',
//         variable: 'trying_get_pregnant',
//         matchingStrategy: 'EQUAL',
//         onValue:
//           'I have been undergoing ovulation induction (medications to assist with ovulation) only',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'fertility_medication_during_cycle',
//       goToOnFalse: 'return_to_tunnel',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_partner_male_3',
//     type: 'MULTI',
//     isCondition: true,
//     id: 71,
//     conditions: [
//       {
//         variable: 'current_partner_gender',
//         extractValueFrom: 'SERVER',
//         logicalOperatorToNextQ: 'AND',
//         matchingStrategy: 'EQUAL',
//         onValue: 'Male',
//       },
//       {
//         variable: 'current_partner_sex_birth',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'EQUAL',
//         onValue: 'Male',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'actively_trying_pregnant',
//       goToOnFalse: 'tunnel_b2',
//     },
//     surveyId: 'All',
//   },
//   {
//     surveyId: 'surveyA',
//     key: 'c_pregnancy_status_2',
//     type: 'SINGLE',
//     isCondition: true,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'previous_pregnancy_status',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'c_pregnancy_date',
//       goToOnFalse: 'c_partner_male_3',
//     },
//     id: 72,
//   },
//   {
//     id: 73,
//     key: 'trying_get_pregnant',
//     questionText: 'How have you been trying to get pregnant?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: 'I have been trying naturally',
//         goTo: 'times_unprotected_sex_male_partner_3',
//       },
//       {
//         onValue:
//           'I have been undergoing artificial insemination (intrauterine insemination) in a natural cycle',
//         goTo: 'fertility_medication_during_cycle',
//       },
//       {
//         onValue:
//           'I have been undergoing ovulation induction (medications to assist with ovulation) only',
//         goTo: 'times_unprotected_sex_male_partner_3',
//       },
//       {
//         onValue:
//           'I have been undergoing ovulation induction (medications to assist with ovulation) plus artificial insemination (intrauterine insemination)',
//         goTo: 'fertility_medication_during_cycle',
//       },
//       {
//         onValue:
//           'I have been undergoing IVF (stimulation cycle plus fresh embryo transfer)',
//         goTo: 'were_eggs_own_donor',
//       },
//       {
//         onValue: 'I have been undergoing IVF (frozen embryo transfer cycle)',
//         goTo: 'embryo_donor_egg',
//       },
//     ],
//     preFill: {},
//     values: [
//       'I have been trying naturally',
//       'I have been undergoing artificial insemination (intrauterine insemination) in a natural cycle',
//       'I have been undergoing ovulation induction (medications to assist with ovulation) only',
//       'I have been undergoing ovulation induction (medications to assist with ovulation) plus artificial insemination (intrauterine insemination)',
//       'I have been undergoing IVF (stimulation cycle plus fresh embryo transfer)',
//       'I have been undergoing IVF (frozen embryo transfer cycle)',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 74,
//     key: 'times_unprotected_sex_male_partner_3',
//     questionText:
//       'How many times have you had unprotected sex with a male partner since your last period?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'is_method_sex_with_ovulation',
//       },
//     ],
//     preFill: {},
//     values: ['1-2 Times', ' 3-5 Times', ' 5-10 Times', ' >10 Times'],
//     surveyId: 'All',
//   },
//   {
//     id: 75,
//     key: 'is_method_sex_with_ovulation',
//     questionText:
//       'Did you use a method to try and time having sex with ovulation?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'use_methods_sex_with_ovulation',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_pregnancy_attempt_type_ovulation',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 76,
//     key: 'use_methods_sex_with_ovulation',
//     questionText:
//       'Which methods did you use to time having sex with ovulation?',
//     caption: '(Select all that apply)',
//     doesValuePersist: true,
//     responseType: 'CHECKBOX',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_pregnancy_attempt_type_ovulation',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Timing based on day of cycle',
//       'Temperature monitoring',
//       'Cervical mucus monitoring',
//       'Urine LH testing kit',
//       'Ultrasound tracking',
//       'OTHER_SPECIFY',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 77,
//     key: 'fertility_medication_during_cycle',
//     questionText:
//       'Were you taking any fertility medications during this cycle?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'fertility_medication_list_3',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 78,
//     key: 'fertility_medication_list_3',
//     questionText: 'What medications were you taking?',
//     doesValuePersist: true,
//     isEndOfSurvey: false,
//     responseType: 'CHECKBOX',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     values: [
//       'Letrozole',
//       'Clomid',
//       'FSH injections (e.g., daily injections with Puregon or Gonal F)',
//       'FSH + LH (e.g., Menopur, Pergoveris) or FSH + hCG injections (e.g., Puregon or Gonal F with small doses of Ovidrel)',
//       'hCG "trigger" injection (e.g., single injection with Pregnyl, Ovidrel, or Ovitrell)',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 79,
//     key: 'embryo_donor_egg',
//     questionText: "Was this embryo created using your egg or a donor's egg?",
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'fertility_medication',
//       },
//     ],
//     preFill: {},
//     values: ['Own egg', "Donor's egg "],
//     surveyId: 'All',
//   },
//   {
//     id: 80,
//     key: 'fertility_medication',
//     questionText:
//       'Were you taking any fertility medications during this cycle or after the embryo transfer?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'fertility_medication_list_2',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'embryo_donor_sperm',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 81,
//     key: 'fertility_medication_list',
//     questionText: 'What medications were you taking?',
//     caption: '(Select all that apply for this cycle)',
//     doesValuePersist: true,
//     responseType: 'CHECKBOX',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'embryo_donor_sperm',
//       },
//     ],
//     preFill: {},
//     values: [
//       'FSH injections (e.g., daily injections with Puregon, Gonal F, Bemfola, Rekovelle, Elonva)',
//       'FSH + LH (e.g., Menopur, Pergoveris, Puregon or Gonal F + Luveris)',
//       'hCG "trigger" injection (e.g., single injection with Pregnyl, Ovidrel, or Ovitrelle)',
//       'Oestrogen Tablts (e.g., Progynova) or patches (e.g., Climara)',
//       'Progesterone pessaries (e.g., Crinone, Oripro, Endometrin, Utrogestan)',
//       'Subcutaneous progesterone injection (e.g., Prolutex)',
//       'Intramuscular progesterone injection',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 82,
//     key: 'embryo_donor_egg_2',
//     questionText: "Was this embryo created using your egg or a donor's egg?",
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     values: ['Own egg', " Donor's egg"],
//     surveyId: 'surveyB',
//   },
//   {
//     id: 83,
//     key: 'fertility_medication_list_2',
//     questionText: 'What medication were you taking?',
//     caption: '(Select all that apply for this cycle)',
//     doesValuePersist: true,
//     responseType: 'CHECKBOX',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'embryo_donor_sperm',
//       },
//     ],
//     preFill: {},
//     values: [
//       'FSH injections (e.g., daily injections with Puregon, Gonal F, Bemfola, Rekovelle, Elonva)',
//       'FSH + LH (e.g., Menopur, Pergoveris, Puregon or Gonal F + Luveris)',
//       'GnRH antagonist injections (e.g., orgalutran, cetrotide)',
//       'GnRH agonist (e.g., Synarel, Zoladex)',
//       'hCG "trigger" injection (e.g., single injection with Pregnyl, Ovidrel, or Ovitrelle)',
//       'GnRH agonist "trigger" injection (e.g., Lucrin, Decapeptyl)',
//       'Progesterone pessaries (e.g., Crinone, Oripro, Endometrin, Utrogestan)',
//       'Subcutaneous progesterone injection (e.g., Prolutex)',
//       'Intramuscular progesterone injection',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 84,
//     key: 'embryo_donor_sperm',
//     questionText:
//       "Were the sperm used in this cycle your partner's sperm or a donor's sperm?",
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_pregnancy_attempt_type_ivf_stimulation',
//       },
//     ],
//     preFill: {},
//     values: ["Partner's sperm", " Donor's sperm"],
//     surveyId: 'All',
//   },
//   {
//     id: 85,
//     key: 'embryo_transfer',
//     questionText: 'Did you have an embryo transfer?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'number_embryo_transferred',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'why_no_embryo_transferred',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 86,
//     key: 'number_embryo_transferred',
//     questionText: 'How many embryos were transferred?',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 87,
//     key: 'why_no_embryo_transferred',
//     questionText: 'Why were no embryos transferred?',
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     values: [
//       'I was having genetic testing performed on the embryos (e.g., Pre-implantation Genetic Testing (PGT))',
//       'There was a medical reason that I was unable to have an embryo transfer (e.g., Ovarian Hyperstimulation Syndrome (OHSS))',
//       'There were no embryos available for embryo transfer',
//       'I chose not to have an embryo transfer this cycle',
//       'OTHER_SPECIFY',
//     ],
//     surveyId: 'All',
//   },
//   {
//     id: 88,
//     key: 'were_eggs_own_donor',
//     questionText:
//       "Were the eggs used in this cycle your own eggs or donor's eggs?",
//     doesValuePersist: true,
//     responseType: 'RADIO',
//     nextQuestions: [
//       {
//         onValue: 'Own eggs',
//         goTo: 'fertility_medication_list',
//       },
//       {
//         onValue: "Donor's egg",
//         goTo: 'embryo_donor_sperm',
//       },
//     ],
//     preFill: {},
//     values: ['Own eggs', "Donor's egg"],
//     surveyId: 'All',
//   },
//   {
//     id: 89,
//     key: 'were_embryos_created',
//     questionText: 'Were any embryos created this cycle?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'embryo_transfer',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     key: 'return_to_tunnel',
//     type: 'TUNNEL',
//     isTunnel: true,
//     surveyId: 'All',
//     id: 91,
//   },
//   {
//     key: 'c_tubal_performed_previously',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 92,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'tubal_patency_performed_answered_previously',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'c_tubal_date_more_6_months',
//       goToOnFalse: 'c_months_trying_pregnant_zero',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_tubal_date_more_6_months',
//     type: 'MULTI',
//     isCondition: true,
//     id: 93,
//     conditions: [
//       {
//         variable: 'tubal_patency_performed_answer_date_greater_6_months',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//         logicalOperatorToNextQ: 'OR',
//       },
//       {
//         variable: 'semen_analysis_performed_answer_date_greater_6_months',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'tunnel_c1',
//       goToOnFalse: 'tunnel_b1',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_trying_pregnancy_greater_6',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 94,
//     conditionalNext: {
//       goToOnTrue: 'tunnel_c1',
//       goToOnFalse: 'tunnel_b1',
//     },
//     conditions: [
//       {
//         variable: 'months_trying_pregnant',
//         extractValueFrom: 'SURVEY',
//         matchingStrategy: 'GREATER',
//         onValue: '6',
//       },
//     ],
//     surveyId: 'All',
//   },
//   {
//     key: 'c_age_at_survey',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 95,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'age_at_survey_date_greater_equal_35',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'c_trying_pregnancy_greater_6',
//       goToOnFalse: 'c_trying_pregnancy_12',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_trying_pregnancy_12',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 96,
//     conditionalNext: {
//       goToOnTrue: 'tunnel_c1',
//       goToOnFalse: 'tunnel_b1',
//     },
//     conditions: [
//       {
//         variable: 'months_trying_pregnant',
//         extractValueFrom: 'SURVEY',
//         matchingStrategy: 'GREATER',
//         onValue: '12',
//       },
//     ],
//     surveyId: 'All',
//   },
//   {
//     key: 'c_first_survey_2',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 97,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'first_survey',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'months_trying_pregnant',
//       goToOnFalse: 'c_age_at_survey',
//     },
//     surveyId: 'All',
//   },
//   {
//     id: 98,
//     key: 'months_trying_pregnant',
//     questionText: 'How many months have you been trying to get pregnant?',
//     doesValuePersist: true,
//     responseType: 'NUMBER',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_age_at_survey',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 99,
//     key: 'sexually_active_since_last_period',
//     questionText: 'Have you been sexually active since your last period?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'using_contraception_2',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'end_no_further_questions_ty',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 100,
//     key: 'using_contraception_2',
//     questionText: 'Have you and your partner been using contraception?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'contraception_methods_2',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'unprotected_sex_male_partner',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     key: 'c_partner_male_2',
//     type: 'MULTI',
//     isCondition: true,
//     id: 101,
//     conditions: [
//       {
//         variable: 'current_partner_gender',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'EQUAL',
//         onValue: 'Male',
//         logicalOperatorToNextQ: 'AND',
//       },
//       {
//         variable: 'current_partner_sex_birth',
//         extractValueFrom: 'SERVER',
//         matchingStrategy: 'EQUAL',
//         onValue: 'Male',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'c_previous_semen_analysiss',
//       goToOnFalse: 'return_to_tunnel',
//     },
//     surveyId: 'All',
//   },
//   {
//     id: 102,
//     isTunnel: true,
//     key: 'tunnel_c1',
//     startQ: 'c_previous_tubal_patency',
//     onEnd: 'tunnel_b1',
//   },
//   {
//     id: 103,
//     isTunnel: true,
//     key: 'tunnel_b1',
//     startQ: 'trying_get_pregnant',
//     onEnd: 'end_no_further_questions_ty',
//   },
//   {
//     id: 104,
//     isTunnel: true,
//     key: 'tunnel_b2',
//     startQ: 'trying_get_pregnant',
//     onEnd: 'end_contact_1_month',
//   },
//   {
//     key: 'c_previous_semen_analysiss',
//     type: 'SINGLE',
//     isCondition: true,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'semen_analysis_performed_answered_previously',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'past_6_months_partner_had_semen_analysis',
//       goToOnFalse: 'partner_had_semen_analysis',
//     },
//     surveyId: 'All',
//     id: 105,
//   },
//   {
//     id: 106,
//     key: 'check_tubes_open_blocked',
//     questionText:
//       'Have you had any tests to check if your tubes are open or blocked? This test can be performed by a special ultrasound or X-ray (where fluid/dye is passed through the cervix), or at time of laparoscopic surgery (called "dye studies")',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'where_test_tubes_test_performed',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_partner_male_2',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 107,
//     key: 'past_6_months_check_tubes_open_blocked',
//     questionText:
//       'Over the past 6 months have you had any tests to check if your tubes are open or blocked? This test can be performed by a special ultrasound or X-ray (where fluid/dye is passed through the cervix), or at time of laparoscopic surgery (called "dye studies")',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'where_test_tubes_test_performed',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'c_partner_male_2',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 108,
//     key: 'where_test_tubes_test_performed',
//     questionText: 'Where was this test performed?',
//     caption: '(which hospital or radiology provider)',
//     doesValuePersist: true,
//     responseType: 'TEXTAREA',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'test_tubes_result',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     id: 109,
//     key: 'past_6_months_partner_had_semen_analysis',
//     questionText:
//       'Over the past 6 months has your partner had a semen analysis performed?',
//     doesValuePersist: true,
//     responseType: 'BOOLEAN',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_TRUE',
//         goTo: 'semen_analysis_result',
//       },
//       {
//         onValue: '_VALUE_FALSE',
//         goTo: 'return_to_tunnel',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//   },
//   {
//     key: 'end_contact_research_assistant',
//     questionText:
//       'Your participation in this study has now concluded. We would like to thank you for your valuable contribution to this important area of research. Please contact the research assistant if you have any further questions.',
//     doesValuePersist: true,
//     isEndOfSurvey: true,
//     preFill: {},
//     surveyId: 'All',
//     id: 110,
//   },
//   {
//     key: 'end_contact_1_month',
//     questionText:
//       'No further questions for this cycle. We will contact you again in 1 month. Thank you.',
//     doesValuePersist: true,
//     isEndOfSurvey: true,
//     preFill: {},
//     surveyId: 'All',
//     id: 111,
//   },
//   {
//     key: 'pregnancy_due_date',
//     questionText: 'What is your pregnancy due date?',
//     caption: 'Estimated Date of Delivery (EDD)',
//     optionalSkipText: 'Unsure',
//     doesValuePersist: true,
//     responseType: 'DATE',
//     nextQuestions: [
//       {
//         onValue: '_VALUE_ANY',
//         goTo: 'c_previous_ultrasound',
//       },
//     ],
//     preFill: {},
//     surveyId: 'All',
//     id: 112,
//   },
//   {
//     key: 'c_previous_tubal_patency',
//     type: 'SINGLE',
//     isCondition: true,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'tubal_patency_performed_answered_previously',
//         matchingStrategy: 'TRUE/FALSE',
//         onValue: '_VALUE_TRUE',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'past_6_months_check_tubes_open_blocked',
//       goToOnFalse: 'check_tubes_open_blocked',
//     },
//     surveyId: 'All',
//     id: 113,
//   },
//   {
//     key: 'c_pregnancy_attempt_type_ivf_stimulation',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 114,
//     conditions: [
//       {
//         extractValueFrom: 'SURVEY',
//         variable: 'trying_get_pregnant',
//         matchingStrategy: 'EQUAL',
//         onValue:
//           'I have been undergoing IVF (stimulation cycle plus fresh embryo transfer)',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'were_embryos_created',
//       goToOnFalse: 'c_pregnancy_attempt_type_ivf_frozen',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_pregnancy_attempt_type_ivf_frozen',
//     type: 'SINGLE',
//     isCondition: true,
//     id: 115,
//     conditions: [
//       {
//         extractValueFrom: 'SURVEY',
//         variable: 'trying_get_pregnant',
//         matchingStrategy: 'EQUAL',
//         onValue: 'I have been undergoing IVF (frozen embryo transfer cycle)',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'embryo_transfer',
//       goToOnFalse: 'embryo_transfer',
//     },
//     surveyId: 'All',
//   },
//   {
//     key: 'c_months_trying_pregnant_zero',
//     type: 'SINGLE',
//     isCondition: true,
//     conditions: [
//       {
//         extractValueFrom: 'SERVER',
//         variable: 'months_trying_pregnant',
//         matchingStrategy: 'EQUAL',
//         onValue: '0',
//       },
//     ],
//     conditionalNext: {
//       goToOnTrue: 'months_trying_pregnant',
//       goToOnFalse: 'c_age_at_survey',
//     },
//     surveyId: 'All',
//     id: 116,
//   },
// ]

import client from '@src/api/index'
import EP from '@api/endpoints'

export const getQuestions = (isFirstSurvey) => {
  isFirstSurvey = eval(isFirstSurvey)
  if (isFirstSurvey) {
    return client.get(EP.QUESTIONS()).then((res) => res.data)
    // return questionsApi
  } else {
    return client.get(EP.QUESTIONS()).then((res) => res.data.slice(6))
    // return questionsApi.slice(6)
  }
}
