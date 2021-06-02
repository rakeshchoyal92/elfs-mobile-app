export const data = [
  {
    title: 'Bleeding',
    type: 'checkbox',
    key: 'bleeding',
    data: [
      { key: 'Spot', type: 'multipleIcon', number: 1, color: 'red' },
      { key: 'Light', type: 'multipleIcon', number: 2, color: 'red' },
      { key: 'Normal', type: 'multipleIcon', number: 3, color: 'red' },
      { key: 'Heavy', type: 'multipleIcon', number: 4, color: 'red' },
    ],
  },
  {
    type: 'checkbox',
    title: 'Period Pain',
    key: 'periodPain',
    data: [
      { key: 'None', type: 'multipleIcon', number: 1, color: 'orange' },
      { key: 'Mild', type: 'multipleIcon', number: 2, color: 'orange' },
      { key: 'Moderate', type: 'multipleIcon', number: 3, color: 'orange' },
      { key: 'Severe', type: 'multipleIcon', number: 4, color: 'orange' },
    ],
  },
  {
    title: 'Had Sex',
    key: 'hadSex',
    type: 'radio',
    data: [{ key: 'Yes', type: 'singleIcon', icon: 'heart' }],
  },
  {
    title: 'Experienced sex with pain',
    key: 'experiencedPainWithSex',
    type: 'radio',
    data: [{ key: 'Yes', type: 'singleIcon', icon: 'disappointed' }],
  },
  {
    title: 'Pelvic Pain',
    key: 'pelvicPain',
    type: 'radio',

    data: [{ key: 'Yes', type: 'multipleIcon', number: 1, color: 'black' }],
  },
  {
    title: 'Note',
    key: 'note',
    type: 'textbox',
  },
]
