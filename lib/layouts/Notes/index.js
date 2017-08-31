import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n'

import { connect } from 'react-redux';
import Button from 'rc-mobile-base/lib/components/Button';
import LongButton from 'rc-mobile-base/lib/components/LongButton';

import { get } from 'lodash/object';

import UpdatesActions from 'rc-mobile-base/lib/actions/updates';

import { getRoomById } from 'rc-mobile-base/lib/selectors/rooms';
import { computedIndexedUsers } from 'rc-mobile-base/lib/selectors/users';

import RoomNoteRow from './RoomNoteRow';

class NotesLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNote: null
    }
  }

  static navigationOptions = {
    title: 'Notes',
  };

  componentWillMount() {
    const { room: { name }} = this.props;
  }

  _handleAddNote = () => {
    const { room: { _id: roomId } } = this.props;
    const { newNote } = this.state;

    this.props.addNote(roomId, newNote);

    this.setState({ newNote: '' });
  }

  _handleRemoveNote = (noteId) => {
    const { room: { _id: roomId } } = this.props;

    this.props.removeNote(roomId, noteId);
  }

  disableSubmit = () => {
    const { newNote } = this.state;

    if (!newNote) {
      return true;
    }

    return false;
  }

  render() {
    const { indexedUsers, room: { roomNotes } } = this.props;
    const noteRows = roomNotes.map(note => <RoomNoteRow key={note.id} note={note} user={get(indexedUsers, note.user_id, {})} removeNote={this._handleRemoveNote} />);
    const disableSubmit = this.disableSubmit();

    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.fieldLabel, { marginTop: 5 }]}>{ I18n.t('attendant.notes.index.new-room-note') }</Text>
        <TextInput
          style={styles.textArea}
          onChangeText={(t) => this.setState({ newNote: t })}
          value={this.state.newNote}
          multiline={true}
          maxLength={200}
          placeholder={I18n.t('attendant.notes.index.new-note-placeholder')} />
          
        <Button disabled={disableSubmit} onPress={this._handleAddNote} style={[{ backgroundColor: '#44A454', height: 44, borderRadius: 4, marginBottom: 3, marginTop: 5 }, disableSubmit && { backgroundColor: 'grey' }]} onPress={this._handleAddNote}>
          <Text style={{ color: 'white', fontWeight: '600' }}>{ I18n.t('attendant.notes.index.add-note').toUpperCase() }</Text>
        </Button>

        { roomNotes && roomNotes.length ?
          <Text style={[styles.fieldLabel, { marginTop: 15, marginBottom: 5 }]}>{ I18n.t('attendant.notes.index.previous-notes').toUpperCase() }</Text>
          : null
        }
        { noteRows }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#F0F0F0'
  },
  fieldLabel: {
    fontWeight: '600',
    color: '#4A4A4A',
    fontSize: 14,
    marginTop: 5
  },
  textArea: {
    height: 80,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    fontSize: 14
  },
  messageContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  messageInput: {
    height: 80,
    borderColor: '#C2C2C2',
    borderWidth: 1,
    borderRadius: 3
  },
  messageSubmit: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'royalblue',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3
  },
  messageSubmitText: {
    color: 'white',
    fontSize: 17
  }
});

const mapStateToProps = (state, props) => {
  const roomId = props.navigation.state.params.roomId
  return {
    room: getRoomById(roomId)(state),
    indexedUsers: computedIndexedUsers(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (roomId, note) => dispatch(UpdatesActions.roomNoteAdd({ roomId, note })),
    removeNote: (roomId, noteId) => dispatch(UpdatesActions.roomNoteRemove({ roomId, noteId })),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesLayout);
