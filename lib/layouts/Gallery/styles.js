import styled from 'styled-components/native';

import {
  grey100,
  grey400,
  slate
} from 'rc-mobile-base/lib/styles';

export const Container = styled.ScrollView`
  flex: 1;
`

export const ImageContainer = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${grey400.color};
`

export const DescriptionContainer = styled.View`
  background-color: ${grey100.color};
  justify-content: center;
  align-content: center;
  padding-horizontal: 20;
  padding-vertical: 10;
`

export const DescriptionText = styled.Text`
  color: ${slate.color};
  text-align: center;
`