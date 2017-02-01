import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Modal from 'react-native-modalbox';
import { Button, ListView, Lightbox } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  red,
  blue,
  white,
  slate,
  greyLt,
  grey,
  greyDk,
  green,
  padding,
  margin,
  flx1
} from 'rc-mobile-base/lib/styles';

import moment from 'moment';
import { get } from 'lodash/object';
import { last } from 'lodash/array';
import { find } from 'lodash/collection';

import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

import { computedPopupTasks, computedPopupNotifications } from 'rc-mobile-base/lib/selectors/rooms';
import { computedAttendantPopupTasks } from 'rc-mobile-base/lib/selectors/attendant';
import { computedIndexedUsers } from 'rc-mobile-base/lib/selectors/users';

import UpdatesActions from 'rc-mobile-base/lib/actions/updates';
import GlitchesActions from 'rc-mobile-base/lib/actions/glitches';

class PopupLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewedTasks: []
    }
  }


  _handleUpdate(uuid, status) {
    this.props.updateTask(uuid, status);
  }

  _handleDismiss = (uuid) => {
    const { viewedTasks } = this.state;
    viewedTasks.push(uuid);

    this.setState({ viewedTasks });
  }

  _renderMessage(message) {
    if (!message || !message.message) {
      return null;
    }

    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageImageContainer}>
          <Icon name="picture-o" size={28} color="lightgray" />
        </View>
        <View style={styles.messageMessageContainer}>
          <Text style={styles.messageText}></Text>
          <Text style={styles.messageDetails}></Text>
        </View>
      </View>
    )
  }

  _renderNotification(notifications) {
    const firstNotification = get(notifications, 0, {});
    const task = get(firstNotification, 'task');
    const activeUUID = get(firstNotification, 'uuid');
    const image = get(firstNotification, 'meta.image', null);
    const location = get(firstNotification, 'meta.location', "");
    const user = get(firstNotification, 'creator', {});
    const date_ts = get(firstNotification, 'date_ts');

    return (
      <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
        <View style={styles.header}>
          <View style={styles.headerSide}></View>
          <Text style={styles.headerText}>NOTIFICATION</Text>
          <View style={styles.headerSide}></View>
        </View>

        { image ?
          <View style={styles.imageContainer}>
            <Lightbox
              key={image}
              renderContent={() => <Image style={{ height: 300, marginTop: Dimensions.get('window').height / 2 - 150 }} resizeMode="contain" source={{ uri: image }} />}
              swipeToDismiss={false}
              >
              <Image
                source={{ uri: image }}
                resizeMode="stretch"
                style={styles.imageStyle}
                />
            </Lightbox>
          </View>
          : null
        }

        <Text style={styles.assetText}>{ task }</Text>

        <Text style={styles.metaTitle}>{ 'location'.toUpperCase() }</Text>
        <Text style={styles.metaText}>{ location || "No Location" }</Text>

        <Text style={styles.metaTitle}>{ 'Created By'.toUpperCase() }</Text>
        <Text style={styles.metaText}>{ `${user.first_name} ${user.last_name}` }</Text>

        <Text style={styles.metaTitle}>{ 'Submitted Time'.toUpperCase() }</Text>
        <Text style={styles.metaText}>{ moment.unix(date_ts).fromNow() }</Text>
        <View style={[flx1]}></View>

        <View style={styles.optionsRow}>
          <TouchableOpacity style={[styles.optionBtn, { backgroundColor: '#3CC86B' }]} onPress={() => this._handleUpdate(activeUUID, 'completed')}>
            <Text style={styles.optionBtnText}>OKAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderTask(tasks) {
    const { indexUsers } = this.props;
    const firstTask = get(tasks, 0, {});
    const activeUUID = get(firstTask, 'uuid');
    const [asset, action] = get(firstTask, 'task', ": ").split(": ");
    const image = get(firstTask, 'meta.image', null);
    const lastMessage = last(get(firstTask, 'messages', []));
    const isMandatory = get(firstTask, 'assigned.is_mandatory', false);
    const location = get(firstTask, 'meta.location', "");
    const date_ts = get(firstTask, 'date_ts');
    const user = get(indexUsers, get(firstTask, 'creator_id'));

    return (
      <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
        <View style={styles.header}>
          <View style={styles.headerSide}></View>
          <Text style={styles.headerText}>NEW TASK</Text>
          <TouchableOpacity style={styles.headerSide} onPress={() => this._handleDismiss(activeUUID)}>
            <Entypo name="cross" color="white" size={32} />
          </TouchableOpacity>
        </View>
        { image ?
          <View style={styles.imageContainer}>
            <Lightbox
              key={image}
              renderContent={() => <Image style={{ height: 300, marginTop: Dimensions.get('window').height / 2 - 150 }} resizeMode="contain" source={{ uri: image }} />}
              swipeToDismiss={false}
              >
              <Image
                source={{ uri: image }}
                resizeMode="stretch"
                style={styles.imageStyle}
                />
            </Lightbox>
          </View>
          : null
        }
        <Text style={styles.assetText}>{ asset }</Text>
        <Text style={styles.actionText}>{ action }</Text>
        <Text style={styles.metaTitle}>{ 'location'.toUpperCase() }</Text>
        <Text style={styles.metaText}>{ location || "No Location" }</Text>
        <Text style={styles.metaTitle}>{ 'Created By'.toUpperCase() }</Text>
        <Text style={styles.metaText}>{ `${user.first_name} ${user.last_name}` }</Text>
        <Text style={styles.metaTitle}>{ 'Submitted Time'.toUpperCase() }</Text>
        <Text style={styles.metaText}>{ moment.unix(date_ts).fromNow() }</Text>
        { lastMessage ?
          <View style={{ alignItems: 'center'}}>
            <Text style={styles.metaTitle}>{ 'Last Message'.toUpperCase() }</Text>
            <Text style={[styles.metaText, { fontSize: 13 }]}>{ lastMessage.message }</Text>
          </View>
          : null
        }

        <View style={styles.spacer}></View>

        <View style={styles.optionsRow}>
          { !isMandatory ?
            <TouchableOpacity style={[styles.optionBtn, { backgroundColor: '#C93C46' }]} onPress={() => this._handleUpdate(activeUUID, 'rejected')}>
              <Text style={styles.optionBtnText}>REJECT</Text>
            </TouchableOpacity>
            : null
          }
          <TouchableOpacity style={[styles.optionBtn, { backgroundColor: '#3CC86B' }]} onPress={() => this._handleUpdate(activeUUID, 'claimed')}>
            <Text style={styles.optionBtnText}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { tasks, notifications } = this.props;
    const { viewedTasks } = this.state;

    const availableTasks = tasks.filter(task => !viewedTasks.includes(task.uuid));
    const isOpen = get(notifications, 'length') > 0
                || get(availableTasks, 'length') > 0;

    if (!isOpen) {
      return null;
    }

    return (
      <Modal
        style={[styles.modal]}
        position={"center"}
        ref={"modal3"}
        backdropPressToClose={false}
        swipeToClose={false}
        backdropColor={'#4a4a4a'}
        isOpen={isOpen}>

        { notifications.length ?
          this._renderNotification(notifications)
          : null
        }

        { !notifications.length && tasks.length ?
          this._renderTask(availableTasks)
          : null
        }

      </Modal>
    )
  }
}

const window = Dimensions.get('window')
const modalWidth = window.width > window.height ? window.width * 0.45 : window.width * 0.75;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 5,
    borderRadius: 5,
    height: window.height * 0.9,
    width: modalWidth,
  },
  header: {
    width: modalWidth,
    backgroundColor: '#198CFF',
    height: 50,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerSide: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white'
  },
  taskText: {
    color: '#4a4a4a',
    fontSize: 19
  },
  imageStyle: {
    height: 128,
    width: 128
  },
  imageContainer: {
    height: 128,
    width: 128,
    ...margin.b20,
    ...margin.t10
  },
  assetText: {
    fontSize: 20,
    fontWeight: '500',
    ...slate.text
  },
  actionText: {
    fontSize: 18,
    fontWeight: '500',
    ...slate.text,
    opacity: .8
  },
  metaTitle: {
    fontSize: 14,
    opacity: .9,
    fontWeight: 'bold',
    ...slate.text,
    ...margin.t15
  },
  metaText: {
    fontSize: 17,
    ...slate.text,
  },
  messageContainer: {
    flexDirection: 'row',
    minHeight: 50
  },
  messageImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  messageMessageContainer: {

  },
  messageText: {

  },
  messageDetails: {

  },
  spacer: {
    flex: 1
  },
  optionBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 5,
    margin: 3
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // ...greyLt.bg
  },
  optionBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  }
});

const mapStateToProps = (state, props) => {
  return {
    tasks: props.isAttendantApp ? computedAttendantPopupTasks(state) : computedPopupTasks(state),
    notifications: computedPopupNotifications(state),
    indexUsers: computedIndexedUsers(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (uuid, status) => dispatch(UpdatesActions.taskUpdate({ uuid, status })),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupLayout);
