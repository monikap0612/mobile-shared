import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  flxRow,
  flxCol,
  margin,
  text,
  aic,
  jcc,
  white,
  slate,
  greyDk,
  grey400,
  red,
  jcsb
} from '../../styles';

import ListSelect from '../../components/ListSelect';
import Picture from '../../components/Picture';

import UserRow from './UserRow';

export const Opener = ({ user, onPress }) => (
  <TouchableOpacity
    style={[white.bg, flxRow, aic, jcsb, grey400.bc, {height: 50}]}
    onPress={onPress}
  >
    <View style={[flxRow, aic]}>
      <View style={[margin.x10]}>
        <Picture
          round
          icon="v-card"
          size={46}
          value={user.image}
        />
      </View>
      <View>
        <Text style={[{fontSize: 15}]}>
          {user.fullName}
        </Text>
        <Text style={[red.text]}>
          Tap to change
        </Text>
      </View>
    </View>
    <View style={[jcc, margin.r10]}>
      <Icon
        name="chevron-down"
        size={14}
        color={slate.color}
      />
    </View>
  </TouchableOpacity>
)

export const SelectUser = ({ value, ...props }) => (
  <ListSelect
    renderValue={(onPress, user) => <Opener user={user} onPress={onPress} />}
    renderOption={(onPress, option) => <UserRow user={option} onPress={onPress} />}
    {...props}
  />
)

export default SelectUser
