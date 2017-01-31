import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListView } from '@shoutem/ui';

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

import H1 from '../../components/H1';
import ModalToggler from '../../components/ModalToggler';
import ModalHeader from '../../components/ModalHeader';

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

export const RecentNQuick = ({ label, options, onPress }) => (
  <ModalToggler
    renderValue={(toggle, user) => <Opener onPress={toggle} />}
    renderModal={(toggle) => (
      <View>
        <ModalHeader value={label} onPress={toggle} />
        <ListView
          data={options}
          renderRow={(option) =>
            <QuickNotification
              {...option}
              onPress={() => {
                onPress(option)
                toggle()
              }}
            />
          }
        />
      </View>
    )}
  />
)

export default RecentNQuick
