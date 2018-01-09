import React, { Component } from 'react';
import { LayoutAnimation, InteractionManager, FlatList } from 'react-native';
import moment from 'moment';
import get from 'lodash/get';

import Message from './Message';
import Button from './Button';
import RadioGroup from './RadioGroup';
import Dates from './Dates';

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
  { label: 'Day & Night', value: 'dn' },
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
    checkedMessages: [],
    
    isAddMessage: false,
    isChangeRoom: false,
    activeMessage: null,

    newMessageMessage: '',
    newMessageType: 'dn',
    newMessageSchedule: 'eod',

    dateRange: [],
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  }

  componentDidMount() {
    const range = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const dateRange = range.map(i => moment().add(i, 'days').format('YYYY-MM-DD'));
    
    this.setState({ dateRange });
  }

  _toggleAdd = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isAddMessage: !this.state.isAddMessage });
  }
  _toggleChange = () => this.setState({ isChangeRoom: !this.state.isChangeRoom })
  _toggleEdit = (message) => this.setState({ activeMessage: !!activeMessage && activeMessage || null })

  _handleCheckMessage = (messageId) => this.state.checkedMessages.includes(messageId) ? 
    this.setState({ checkedMessages: this.state.checkedMessages.filter(i => i !== messageId) }) :
    this.setState({ checkedMessages: [...this.state.checkedMessages, messageId] })
  
  _handleChangeSchedule = (newMessageSchedule) => {
    const startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(1, 'days').format('YYYY-MM-DD');
    
    if (newMessageSchedule === "eod") {
      endDate = moment().format('YYYY-MM-DD');
    } else if (newMessageSchedule === "eos") {
      endDate = moment().add(3, 'days').format('YYYY-MM-DD');
    }
    
    this.setState({ newMessageSchedule, startDate, endDate });
  }
  _handleChangeDate = (day, type) => this.setState({ [type]: day, newMessageSchedule: 'custom' })
  _handleAdd = () => {
    const { roomId } = this.props;
    const { newMessageMessage, newMessageSchedule, newMessageType, startDate, endDate } = this.state;
    const message = {
      message: newMessageMessage,
      messageType: newMessageType,
      schedule: newMessageSchedule,
      startDate,
      endDate
    }

    this.props.addMessage(roomId, message);
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isAddMessage: false,
        newMessageMessage: '',
        newMessageType: 'dn',
        newMessageSchedule: 'eod',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      }, () => {
        if (this.props.onAdd) {
          this.props.onAdd();
        }
      });
    })
  }

  _handleRemove = () => {
    const { roomId } = this.props;
    const { checkedMessages } = this.state;
    
    this.props.removeMessage(roomId, checkedMessages);
    this.setState({ checkedMessages: [] });

    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }
  
  _defaultRender() {
    const { roomId, messages, indexedUsers, removeMessage, style } = this.props;
    const { checkedMessages } = this.state;

    return (
      <Container style={style}>
        {/* <Title>{ `Room Messages`.toUpperCase() }</Title> */}
        {/* <Message index={0} checkedMessages={this.state.checkedMessages} toggleMessage={this._handleCheckMessage} />
        <Message index={1} checkedMessages={this.state.checkedMessages} toggleMessage={this._handleCheckMessage} /> */}
        { (messages || []).map((message, index) =>
          <Message
            message={message}
            indexedUsers={indexedUsers}
            index={index}
            checkedMessages={this.state.checkedMessages}
            toggleMessage={this._handleCheckMessage}
            key={index}
            />
        )}

        {/* <FlatList
          style={{ width: '100%' }}
          data={messages || []}
          keyExtractor={(item, index) => item.messageId}
          renderItem={({ item, index }) => <Message message={item} indexedUsers={indexedUsers} index={index} checkedMessages={this.state.checkedMessages} toggleMessage={this._handleCheckMessage}/>}
          /> */}
        <OptionsRow>
          <Spacer />
    
          <Button icon="plus" color={blue.color} onPress={this._toggleAdd}>Add Message</Button>
          <Button
            icon="trash"
            color={!checkedMessages || !checkedMessages.length ? greyDk.color : red.color}
            isDisabled={!checkedMessages || !checkedMessages.length}
            onPress={this._handleRemove}
          >Remove messages</Button>
          {/* <Button icon="share" color={orange.color}>Change room</Button> */}
        </OptionsRow>
      </Container>
    )
  }

  _addRender() {
    const { style } = this.props;

    return (
      <Container style={style}>
        {/* <Title style={[margin.b15]} >{ `Add Room Message`.toUpperCase() }</Title> */}

        <Subtitle style={[margin.b10]} >{ `Message`.toUpperCase() }</Subtitle>
        <NewMessageInput
          value={this.state.newMessageMessage}
          onChangeText={(t) => this.setState({ newMessageMessage: t })}
          style={[margin.b15]}
          />
        
        <Subtitle style={[margin.b10, margin.t10]} >{ `Message Type`.toUpperCase() }</Subtitle>
        <RadioGroup
          options={TYPE_OPTIONS}
          value={this.state.newMessageType}
          onChange={(v) => this.setState({ newMessageType: v })}
          />

        <Subtitle style={[margin.b10, margin.t25]} >{ `Message Schedule`.toUpperCase() }</Subtitle>
        <RadioGroup
          options={SCHEDULE_OPTIONS}
          value={this.state.newMessageSchedule}
          onChange={this._handleChangeSchedule}
          />

        <Subtitle style={[margin.b10, margin.t25]} >{ `Active Dates`.toUpperCase() }</Subtitle>
        <Dates
          dateRange={this.state.dateRange}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleUpdate={this._handleChangeDate}
          />
        
        <OptionsRow style={[margin.t30]}>
          <Spacer />
    
          <Button icon="ban" color={greyDk.color} onPress={this._toggleAdd}>Cancel</Button>
          <Button icon="paper-plane" color={blue.color} onPress={this._handleAdd}>Submit message</Button>
        </OptionsRow>
      </Container>
    )  
  }
  
  render() {
    const { isAddMessage } = this.state;

    if (isAddMessage) {
      return this._addRender();      
    }

    return this._defaultRender();
  }
}

export default RoomMessages;