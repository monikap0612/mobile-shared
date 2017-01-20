import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  flxRow,
  margin,
  text,
  aic,
  jcc,
  white,
  slate,
  greyDk
} from '../../styles';

import ListSelect from '../../components/ListSelect';
import H1 from '../../components/H1';

import QuickNotification from './QuickNotification';

export const Opener = ({ onPress }) => (
  <TouchableOpacity
    style={[white.bg, flxRow, aic, jcc, {height: 45}]}
    onPress={onPress}
  >
    <H1 style={[greyDk.text]}>RECENT & QUICK NOTIFICATIONS</H1>
    <Icon
      style={[margin.l5]}
      name="chevron-down"
      size={14}
      color={greyDk.color}
    />
  </TouchableOpacity>
)

export const RecentNQuick = ({ value, ...props }) => (
  <ListSelect
    renderValue={(onPress, user) => <Opener onPress={onPress} />}
    renderOption={(onPress, option) => <QuickNotification {...option} onPress={onPress} />}
    {...props}
  />
)

export default RecentNQuick
