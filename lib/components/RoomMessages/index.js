import React, { Component } from 'react';

import Message from './Message';
import Button from './Button';
import RadioGroup from './RadioGroup';

import { 
  Container,
  Title,
  Subtitle,
  OptionsRow,
  Spacer,
  NewMessageInput
} from './styles';

import {
  blue,
  red,
  orange,
  grey,
  greyDk,
  margin
} from 'rc-mobile-base/lib/styles';

const TYPE_OPTIONS = [
  { label: 'Day & Night', value: 'daynight' },
  { label: 'Day', value: 'day' },
  { label: 'Night', value: 'night' },
  { label: 'Pickup', value: 'pu' },
]
const SCHEDULE_OPTIONS = [
  { label: 'Today', value: 'eod' },
  { label: 'End of stay', value: 'eos' },
  { label: 'Custom', value: 'custom' },
]

class RoomMessages extends Component {
  
  state = {
    isAddMessage: false,
    isChangeRoom: false,
    activeMessage: null,

    newMessageMessage: '',
    newMessageType: 'daynight',
    newMessageSchedule: 'eod',
  }

  toggleAdd = () => this.setState({ isAddMessage: !this.state.isAddMessage })
  toggleChange = () => this.setState({ isChangeRoom: !this.state.isChangeRoom })
  toggleEdit = (message) => this.setState({ activeMessage: !!activeMessage && activeMessage || null })
  
  _defaultRender() {
    const { style } = this.props;

    return (
      <Container style={style}>
        <Title>{ `Room Messages`.toUpperCase() }</Title>
        <Message />
        <Message />
        <OptionsRow>
          <Spacer />
    
          <Button icon="plus" color={blue.color}>Add Message</Button>
          <Button icon="trash" color={red.color} isDisabled={true}>Remove messages</Button>
          <Button icon="share" color={orange.color}>Change room</Button>
        </OptionsRow>
      </Container>
    )
  }

  _addRender() {
    const { style } = this.props;

    return (
      <Container style={style}>
        <Title style={[margin.b15]} >{ `Add Room Message`.toUpperCase() }</Title>

        <Subtitle style={[margin.b10]} >{ `Message`.toUpperCase() }</Subtitle>
        <NewMessageInput
          value={this.state.newMessageMessage}
          onChangeText={(t) => this.setState({ newMessageMessage: t })}
          style={[margin.b15]}
          />
        
        <Subtitle style={[margin.b10]} >{ `Message Type`.toUpperCase() }</Subtitle>
        <RadioGroup
          options={TYPE_OPTIONS}
          value={this.state.newMessageType}
          onChange={(v) => this.setState({ newMessageType: v })}
          />

        <Subtitle style={[margin.b10, margin.t15]} >{ `Message Schedule`.toUpperCase() }</Subtitle>
        <RadioGroup
          options={SCHEDULE_OPTIONS}
          value={this.state.newMessageSchedule}
          onChange={(v) => this.setState({ newMessageSchedule: v })}
          />
        
        <OptionsRow style={[margin.t30]}>
          <Spacer />
    
          <Button icon="ban" color={greyDk.color}>Cancel</Button>
          <Button icon="paper-plane" color={blue.color}>Submit message</Button>
        </OptionsRow>
      </Container>
    )  
  }
  
  render() {
    return this._addRender();
    return this._defaultRender();
  }
}

export default RoomMessages;