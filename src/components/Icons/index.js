import React from 'react'

import { AntDesign } from '@expo/vector-icons'
import { SCREENS } from '@constants/strings'

export const RenderIcon = (props) => {
  const { name, color, ...restProps } = props
  const iconColor = restProps.style?.tintColor || color

  switch (name) {
    case SCREENS.CALENDAR:
      return <AntDesign name="calendar" size={24} color={iconColor} />
    case SCREENS.SURVEY:
      return <AntDesign name="profile" size={24} color={iconColor} />
    case SCREENS.SETTINGS:
      return <AntDesign name="setting" size={24} color={iconColor} />
    default:
      return <AntDesign name="setting" size={24} color={iconColor} />
  }
}
