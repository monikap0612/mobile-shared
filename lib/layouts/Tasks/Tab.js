import React, { Component } from 'react';
import {
  View
} from 'react-native';

const Tab = ({ value, active, children }) => value === active ? (
  <View>
    {children}
  </View>
) : null

export default Tab;
