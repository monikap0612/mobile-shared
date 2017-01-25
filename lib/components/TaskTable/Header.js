import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import {
  flxRow,
  flxCol,
  flx3,
  flx2,
  flx1,
  margin,
  padding
} from 'rc-mobile-base/lib/styles';

import H2 from '../H2';

export const Header = ({ tasks }) => (
  <View style={[flxRow, margin.y5]}>
    <View style={[flxCol, flx2]}>
      <H2>Task</H2>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <H2>Location</H2>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <H2>Created by</H2>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <H2>Time Created</H2>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <H2>Assigned</H2>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <H2>Status</H2>
    </View>
  </View>
)

export default Header
