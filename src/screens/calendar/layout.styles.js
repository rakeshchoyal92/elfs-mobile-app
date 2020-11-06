import { ScrollView, View } from 'react-native'
import styled from 'styled-components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const HeaderContainer = styled(View)`
  height: 80px;
  background-color: #dedbdb;
  flex-direction: row;
  align-items: center;
`

export const FooterContainer = styled(View)`
  height: 60px;
  background-color: #dedbdb;
  justify-content: center;
`

export const ContentContainer = styled(KeyboardAwareScrollView)`
  flex-grow: 2;
  background-color: white;
  padding: 30px 10px;
`
