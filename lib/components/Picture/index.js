import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {
  grey,
  jcc,
  aic
} from 'rc-mobile-base/lib/styles';

export const Picture = ({ value, size, round, icon, color }) => {
  const dims = { width: size, height: size }
  const appearance = [dims, round && { borderRadius: size / 2 }]

  if (!value) {
    const iconColor = color || grey.color;
    const iconName = icon || 'image';
    const iconSize = size - 15;
    return (
      <View style={[jcc, aic, ...appearance]}>
        <Icon
          color={iconColor}
          name={iconName}
          size={iconSize}
        />
      </View>
    )
  }

  return (
    <Image
      style={appearance}
      source={{uri: value}}
      resizeMethod='resize'
    />
  )
}

export default Picture
