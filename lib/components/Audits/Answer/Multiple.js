import React from 'react';

import {
  MultipleContainer,
  Option,
} from './styles';

// import  from './Option';

export default Multiple = ({ options, value, onChange, ...props }) => options && options.length > 0 ? (
  <MultipleContainer {...props}>
    {
      options.map((option, index) => (
        <Option
          key={index}
          active={value === option}
          onPress={() => onChange({ value: option, label: option })}
        >
          {option}
        </Option>
      ))
    }
  </MultipleContainer>
) : null