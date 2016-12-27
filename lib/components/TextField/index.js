import React from 'react';
import { TextInput } from 'react-native';

export const TextField = ({ input: { value, onChange, onBlur, onFocus }, ...others }) => (
  <TextInput
    underlineColorAndroid="transparent"
    onChangeText={text => onChange(text)}
    onBlur={text => onBlur(text)}
    onFocus={text => onFocus(text)}
    value={value}
    selectTextOnFocus
    {...others}
  />
)

export default TextField
