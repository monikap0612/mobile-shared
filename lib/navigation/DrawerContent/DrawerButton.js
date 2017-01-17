import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  flxRow,
  aic,
  margin,
  slate,
  padding
} from '../../styles';

export const DrawerButton = ({ text, icon, onPress }) => (
  <TouchableOpacity
    style={[flxRow, margin.t15, aic]}
    onPress={onPress}
  >
    <Icon
      name={icon}
      size={24}
      color={slate.color}
    />
    <Text style={[slate.text, padding.l5, {fontSize: 18}]}>
      {text}
    </Text>
  </TouchableOpacity>
)

export default DrawerButton;
