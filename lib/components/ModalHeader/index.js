import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
  flxRow,
  blue500,
  flex1,
  jcc,
  aic,
  white,
} from 'rc-mobile-base/lib/styles';

export const ModalHeader = ({ value }) => (
  <View style={[flxRow, blue500.bg, jcc, aic, {height: 55}]}>
    <Text style={[white.text, {fontSize: 17}]}>
      {value}
    </Text>
  </View>
)

export default ModalHeader
