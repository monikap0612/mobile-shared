import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {
  flxRow,
  margin,
  padding,
  eitherGrey_100_200,
  eitherGreyRed,
  greyDk,
  blueLt,
  slate,
  lCenterCenter,
  white
} from 'rc-mobile-base/lib/styles';

const ExitButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.exitBtn} onPress={onPress}>
      <Text style={styles.exitBtnText}>
        EXIT SELECTION
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  exitBtn: {
    ...flxRow,
    ...greyDk.bg,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exitBtnText: {
    fontSize: 17,
    fontWeight: 'bold',
    ...white.text
  }
});

export default ExitButton;
