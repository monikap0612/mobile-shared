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
  margin,
  padding,
  text,
  aic,
  jcc,
  white,
  slate,
  greyDk,
  grey400,
  red,
  blue500,
  blue300,
  green,
  jcsb
} from '../../styles';

import ListSelect from '../../components/ListSelect';

export const Location = ({ value, onPress }) => (
  <TouchableOpacity
    style={[flxRow, blue300.bg, aic, jcsb, margin.x5, padding.x5, {height: 45, minWidth: 35, borderRadius: 20}]}
    onPress={onPress}
  >
    <Text style={[white.text, margin.x5]}>
      {value.name}
    </Text>
    <Icon
      style={[margin.x5]}
      name="cross"
      size={18}
      color={white.color}
    />
  </TouchableOpacity>
)

export const LocationAdd = ({ onPress }) => (
  <TouchableOpacity
    style={[green.bg, aic, jcc, margin.x5, {height: 45, width: 45, borderRadius: 27}]}
    onPress={onPress}
  >
    <Icon
      name="plus"
      size={20}
      color={white.color}
    />
  </TouchableOpacity>
)

export const Opener = ({ user, onPress }) => (
  <View
    style={[white.bg, flxRow, aic, grey400.bc, {height: 55}]}
  >
    <Location value={{name:'101'}} />
    <Location value={{name:'102'}} />
    <LocationAdd onPress={() => console.log('DDDDDDDDD')} />
  </View>
)

export default Opener
