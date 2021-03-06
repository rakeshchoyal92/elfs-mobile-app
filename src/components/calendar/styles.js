import styled from 'styled-components/native'
import { View, ScrollView } from 'react-native'
import Emoji from 'react-native-emoji'
import { Text } from '@ui-kitten/components'

export const StyledScrollView = styled(ScrollView)`
  margin-bottom: 10px;
`

export const StyledEmojiView = styled(View)`
  width: 60px;
  background-color: #dfeff3;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  height: 60px;
`

export const StyledEmoji = styled(Emoji)`
  font-size: 7px;
  padding-right: 4px;
  position: absolute;
  top: -13px;
  right: 0;
`

export const StyledEmojiCaption = styled(Text)`
  font-size: 13px;
  margin-top: 3px;
  text-align: center;
`
