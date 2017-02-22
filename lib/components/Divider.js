import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {
  padding,
  margin,
  slate,
} from 'rc-mobile-base/lib/styles';

const Divider = () => {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    ...slate.bg,
    ...padding.x10,
    ...margin.y5,
    opacity: .5
  },
});

export default Divider;
