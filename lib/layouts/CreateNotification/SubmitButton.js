import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {
  flxRow,
  green,
  margin,
  padding,
  white,
  jcc,
  aic,
  flex1,
  flexGrow1
} from 'rc-mobile-base/lib/styles';

export const SubmitButton = ({ onPress }) => (
  <View style={[flxRow, padding.a10, {height: 70}]}>
    <TouchableOpacity
      onPress={() => onPress()}
      style={[flexGrow1, aic, jcc, green.bg]}
    >
      <Text style={[white.text, {fontSize: 18}]}>
        SEND NOTIFICATION
      </Text>
    </TouchableOpacity>
  </View>
)

export default SubmitButton
