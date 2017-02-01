import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {
  flxRow,
  margin,
  padding,
  white,
  green,
  red,
  jcc,
  aic,
  flexGrow1,
  text
} from 'rc-mobile-base/lib/styles';

export const SubmitButton = ({ onPress, valid }) => (
  <View style={[flxRow, padding.a10, {height: 70}]}>
    <TouchableOpacity
      onPress={() => valid ? onPress() : null}
      style={[flexGrow1, aic, jcc, green.bg, !valid && red.bg]}
    >
      <Text style={[white.text, text.center, {fontSize: 18}]}>
        {
          (valid ? 'SEND NOTIFICATION' : 'Missing location or user').toUpperCase()
        }
      </Text>
    </TouchableOpacity>
  </View>
)

export default SubmitButton
