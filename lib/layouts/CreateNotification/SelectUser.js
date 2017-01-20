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

import Avatar from '../../components/Avatar';
import ModalField from '../../components/ModalField';
import ModalHeader from '../../components/ModalHeader';

import UserSelect from './UserSelect';

export const Opener = ({ user, onPress }) => (
  <TouchableOpacity
    style={[white.bg, flxRow, aic, jcsb, grey400.bc, {height: 50}]}
    onPress={onPress}
  >
    <View style={[flxRow, aic]}>
      <View style={[margin.x10]}>
        <Avatar
          name={user.name}
          size={44}
          value={user.image}
        />
      </View>
      <View>
        <Text style={[{fontSize: 15}]}>
          {user.name}
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

export const SelectUser = ({ options, label, ...props }) => (
  <ModalField
    {...props}
    renderValue={(onPress, user) => <Opener user={user} onPress={onPress} />}
    renderModal={(onPress) => (
      <View>
        <ModalHeader value={label} />
        <UserSelect
          options={options}
          onPress={onPress}
        />
      </View>
    )}
  />
)

export default SelectUser
