import React from 'react';
import I18n from 'react-native-i18n'

import ItemType from './ItemType';

import {
  ItemContainer,
  ItemImage,
  ItemImagePlaceholder,
  ItemDescription,
  ItemTypeContainer,
  ItemReference,
  ItemGuest,
  ItemLocation,
  ItemUser,
  ItemStatusContainer,
  ItemStatusButton,
  ItemStatusText,
} from './styles';

import { updateOptionsLookup } from './utils';

export default Item = ({ item, handleActive }) => (
  <ItemContainer>
    { item.image ?
      <ItemImage
        source={{ uri: item.image || '' }}
        resizeMethod='resize'
        />
      :
      <ItemImagePlaceholder />
    }
    <ItemDescription>{ item.name_or_description }</ItemDescription>
    <ItemTypeContainer>
      <ItemType label={"found"} isFound={true} />
    </ItemTypeContainer>
    <ItemReference>{ item.reference }</ItemReference>
    <ItemGuest>{ item.guest_name }</ItemGuest>
    <ItemLocation>{ item.location || item.room_name }</ItemLocation>
    <ItemUser>{ `${item.user_first_name} ${item.user_last_name}` }</ItemUser>
    <ItemStatusContainer>
      <ItemStatusButton onPress={() => handleActive(item)}>
        <ItemStatusText>{ I18n.t(updateOptionsLookup(item.status)) }</ItemStatusText>
      </ItemStatusButton>     
    </ItemStatusContainer>
  </ItemContainer>
)