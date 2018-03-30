import React from 'react';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  grey400,
  grey100,
  grey,
  greyDk,
  white,
  blueLt,
  blue,
  red,
  slate
} from 'rc-mobile-base/lib/styles';

export const Container = styled.View`
  flex: 1;
  background-color: #F0F0F0; 
`

export const SubheaderContainer = styled.View`
  flex-direction: row;
  background-color: ${grey400.color};
  height: 50;
`

export const Content = styled.View`
  flex: 1;
  padding-horizontal: 20;
`

export const ContentSpacing = styled.View`
  margin-vertical: 10;
`

export const ListHeaderContainer = styled.View`
  
`

export const ListHeaderDate = styled.Text`
  padding-top: 24;
  padding-bottom: 8;
`

export const ItemContainer = styled.View`
  flex-direction: row;
  height: 50;
  align-items: center;
  background-color: white;
  margin-bottom: 4;
`

export const ItemImage = styled.Image`
  height: 50;
  width: 50;
  margin-right: 10;
`

export const ItemImagePlaceholderContainer = styled.View`
  height: 50;
  width: 50;
  margin-right: 10;
  background-color: ${grey100.color};
  justify-content: center;
  align-items: center;
`

export const ItemImagePlaceholder = () => (
  <ItemImagePlaceholderContainer>
    <Icon name="picture-o" size={24} color={slate.color} />
  </ItemImagePlaceholderContainer>
)

export const ItemDescription = styled.Text`
  color: ${slate.color};
  font-size: 14;
  flex: 2;
`

export const ItemTypeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ItemTypeBg = styled.View`
  padding-vertical: 6;
  padding-horizontal: 8;
  background-color: ${props => props.isFound ? blueLt.color : red.color};
  border-radius: 4;
`

export const ItemTypeText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 13;
`

export const ItemReference = styled.Text`
  color: ${slate.color};
  font-size: 14;
  flex: 1;
`

export const ItemGuest = styled.Text`
  color: ${slate.color};
  font-size: 14;
  flex: 2;
`

export const ItemLocation = styled.Text`
  color: ${slate.color};
  font-size: 14;
  flex: 1;
`

export const ItemUser = styled.Text`
  color: ${slate.color};
  font-size: 14;
  flex: 1;
`

export const ItemStatusContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ItemStatusButton = styled.TouchableOpacity`
  height: 44;
  width: 80;
  background-color: ${blue.color};
  justify-content: center;
  border-radius: 4;
`

export const ItemStatusText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 13;
  text-align: center;
`

export const ModalContainer = styled.View`
  background-color: white;
  width: 800;
  height: 600;
`

export const ModalContent = styled.View`
  flex: 1;
  padding-horizontal: 20;
  padding-vertical: 20;
`

export const OptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const OptionButton = styled.TouchableOpacity`
  width: 100;
  height: 50;
  border-radius: 4;
  justify-content: center;
  align-items: center;
  margin-right: 8;
  background-color: ${props => props.isActive ? blue.color: greyDk.color};
  padding-horizontal: 4;
  margin-bottom: 10;
`

export const OptionText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 13;
  text-align: center;
`