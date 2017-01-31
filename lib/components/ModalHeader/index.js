import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {
  flxRow,
  flxCol,
  padding,
  margin,
  blue500,
  flex1,
  jcc,
  jcsb,
  jcsa,
  aic,
  white,
  asfe,
} from 'rc-mobile-base/lib/styles';

export const ModalHeader = ({ value, onPress }) => (
  <View style={[flxRow, blue500.bg, jcsa, aic, {height: 55}]}>
    {onPress && <View></View>}
    <Text style={[white.text, {fontSize: 17}]}>
      {value}
    </Text>
    {
      onPress &&
        <TouchableOpacity onPress={onPress} style={[aic, jcc, margin.r10, {width: 45, height: 45}]}>
          <Icon
            name="cross"
            size={24}
            color={white.color}
          />
        </TouchableOpacity>
    }
  </View>
)

export default ModalHeader
