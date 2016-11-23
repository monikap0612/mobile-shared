import React from 'react';
import { TextInput } from 'react-native';

export const TextField = ({ input: { value, onChange }, ...others }) => (
  <TextInput
    onChangeText={(value) => onChange(value)}
    value={value}
    {...others}
  />
)

export default TextField
