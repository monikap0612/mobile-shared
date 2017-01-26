import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  padding,
  margin,
  slate,
  grey100,
  grey200,
  blueLt
} from 'rc-mobile-base/lib/styles';

const NewMessage = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Enter a message'}
        style={styles.inputStyle}
        />
      <TouchableOpacity style={styles.submitContainer}>
        <Icon name="paper-plane" color={blueLt.color} size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: grey200.color,
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    ...padding.x10,
    paddingTop: 8
  },
  inputStyle: {
    flex: 1,
    borderColor: grey100.color,
    borderWidth: 1,
    height: 44,
    ...padding.x5,
    borderRadius: 2,
    fontSize: 15
  },
  submitContainer: {
    width: 60,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NewMessage;
