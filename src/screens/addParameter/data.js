import { faHeart, faBolt, faTint } from '@fortawesome/free-solid-svg-icons'

export const data = [
  {
    title: 'Bleeding',
    type: 'checkbox',
    key: 'bleeding',
    data: [
      {
        key: 'Spot',
        type: 'multipleIcon',
        font: faTint,
        number: 1,
        color: 'red',
      },
      {
        key: 'Light',
        type: 'multipleIcon',
        font: faTint,
        number: 2,
        color: 'red',
      },
      {
        key: 'Moderate',
        type: 'multipleIcon',
        font: faTint,
        number: 3,
        color: 'red',
      },
      {
        key: 'Heavy',
        type: 'multipleIcon',
        font: faTint,
        number: 4,
        color: 'red',
      },
    ],
  },
  {
    type: 'checkbox',
    title: 'Period Pain',
    key: 'periodPain',
    data: [
      // {
      //   key: 'None',
      //   type: 'multipleIcon',
      //   font: 'bolt',
      //   number: 0,
      //   color: 'orange',
      // },
      {
        key: 'Mild',
        type: 'multipleIcon',
        font: faBolt,
        number: 1,
        color: '#ff9505',
      },
      {
        key: 'Moderate',
        type: 'multipleIcon',
        font: faBolt,
        number: 2,
        color: '#ff9505',
      },
      {
        key: 'Severe',
        type: 'multipleIcon',
        font: faBolt,
        number: 3,
        color: '#ff9505',
      },
    ],
  },
  {
    title: 'Had Sex',
    key: 'hadSex',
    type: 'radio',
    color: 'red',
    data: [{ key: 'Yes', type: 'singleIcon', icon: faHeart, color: 'red' }],
  },
  {
    title: 'Experienced Pain with Sex',
    shortTitle: 'Pain with Sex',
    key: 'sexWithPain',
    type: 'radio',
    color: 'orange',
    data: [
      {
        key: 'Yes',
        type: 'twoIcons',
        icon1: faHeart,
        icon2: faBolt,
        color1: 'red',
        color2: '#ff9505',
      },
    ],
  },
  {
    title: 'Pelvic Pain',
    key: 'pelvicPain',
    type: 'radio',
    color: 'black',
    data: [
      {
        key: 'Yes',
        type: 'singleIcon',
        icon: faBolt,
        color: 'blue',
      },
    ],
  },
  {
    title: 'Note',
    key: 'notes',
    type: 'textbox',
  },
]
