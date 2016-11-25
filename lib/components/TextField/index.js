import React from 'react';
import { TextInput } from 'react-native';

export const TextField = ({ input: { value, onChange, onBlur }, ...others }) => (
  <TextInput
    underlineColorAndroid="transparent"
    onChangeText={text => onChange(text)}
    onBlur={text => onBlur(text)}
    value={value}
    selectTextOnFocus
    {...others}
  />
)

export default TextField
