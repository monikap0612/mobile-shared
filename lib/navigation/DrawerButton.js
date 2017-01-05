import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const DrawerButton = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
      <Icon name={this.props.icon} size={24} color="#4a4a4a" />
      <Text style={styles.text}>{this.props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  text: {
    color: '#4a4a4a',
    paddingLeft: 5,
    fontSize: 18
  }
});

export default DrawerButton;
