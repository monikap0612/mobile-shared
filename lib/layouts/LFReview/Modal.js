import React from 'react';
import I18n from 'react-native-i18n'
import ModalHeader from 'rc-mobile-base/lib/components/ModalHeader';

import {
  ModalContainer,
  ModalContent,
  OptionsContainer,
  OptionButton,
  OptionText
} from './styles';

import { updateOptions } from './utils';

const Option = ({ label, value, handle, isActive }) => (
  <OptionButton isActive={isActive} onPress={() => handle(value)}>
    <OptionText>{ label }</OptionText>
  </OptionButton>
)

export default Modal = ({ status, exit, handleUpdate }) => (
  <ModalContainer>
    <ModalHeader
      value={"Update status"}
      onPress={exit}
      />

    <ModalContent>
      <OptionsContainer>
        { updateOptions.map(({ value, translation }) =>
          <Option
            key={value}
            value={value}
            label={I18n.t(translation)}
            handle={handleUpdate}
            isActive={status === value}
            />
        )}
      </OptionsContainer>
    </ModalContent>
  </ModalContainer> 
)