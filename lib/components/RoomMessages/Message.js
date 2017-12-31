import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from './Button';

import {
  MessageContainer,
  MessageContainerColumnSM,
  MessageContainerColumnLG,
  MessageToggleContainer,
  MessageFocusDetailsRow,
  MessageFocusMessageRow,
  MessageFocusUserRow,
  MessageTypeText,
  MessageDatesUserText,
  MessageMessageText,
  MessageAvatarContainer,
  Spacer
} from './styles';

import { greyDk, grey100, blueLt } from 'rc-mobile-base/lib/styles';

export default Message = () => (
  <MessageContainer>
    <MessageContainerColumnSM>
      <MessageToggleContainer>
      { false ? 
        <Icon name="square-o" size={24} color={grey.color} />
        :
        <Icon name="check-square-o" size={24} color={blueLt.color} />
      }
      </MessageToggleContainer>
      
    </MessageContainerColumnSM>
    <MessageContainerColumnLG>
      
      <MessageFocusDetailsRow>
        <MessageTypeText>
          { `Day Message`.toUpperCase() }
        </MessageTypeText>
        <MessageDatesUserText>
          { `· ${'09:13'} - ${'Apr. 17, 2018'}`.toUpperCase() }
        </MessageDatesUserText>
      </MessageFocusDetailsRow>

      <MessageFocusMessageRow>
        <MessageMessageText>
          The laundry must be put up underneathe the bed.
        </MessageMessageText>
      </MessageFocusMessageRow>
      
      <MessageFocusUserRow>
        <MessageAvatarContainer>
        </MessageAvatarContainer>
        <MessageDatesUserText>
          Aaron Marz
        </MessageDatesUserText>

        <Spacer />

        <Button color={greyDk.color} icon="pencil-square-o">Edit</Button>
      </MessageFocusUserRow>
    </MessageContainerColumnLG>
  </MessageContainer>
) 