import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  RadioRow,
  RadioOptionContainer,
  RadioLabel
} from './styles';

import {
  blue,
  greyDk
} from 'rc-mobile-base/lib/styles';

const RadioOption = ({ label, value, isSelected, onPress }) => (
  <RadioOptionContainer onPress={() => onPress(value)}>
    { isSelected ?
      <Icon name="dot-circle-o" size={20} color={blue.color} />
      :
      <Icon name="circle-o" size={20} color={greyDk.color} />
    }
    
    <RadioLabel style={[isSelected && blue.text]}>{ label }</RadioLabel>
  </RadioOptionContainer>
)

export default RadioGroup = ({ options, value, onChange }) => (
  <RadioRow>
    { options.map(item => 
      <RadioOption key={item.label} isSelected={item.value === value} onPress={onChange} { ...item } />
    )}
  </RadioRow>
)