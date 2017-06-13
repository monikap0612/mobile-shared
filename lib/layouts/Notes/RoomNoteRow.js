import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
// import Swipeout from 'react-native-swipeout';

import moment from 'moment';

class RoomNoteRow extends Component {

  render() {
    const { id, image, user_first_name, user_last_name, note, date_ts } = this.props.note;
    const { user, removeNote } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: user.image }}
          style={styles.userImage}
          />
        <View style={styles.noteContainer}>
          <Text style={styles.note} numberOfLines={4}>
            { note }
          </Text>
          <View style={styles.noteBottom}>
            <Text style={styles.noteUser}>
              { `${user_first_name} ${user_last_name}`.toUpperCase() }
            </Text>
            <Text style={styles.noteTime}>
              { moment.unix(date_ts).format('lll') }
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 50,
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 1
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  noteContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1
  },
  noteUser: {
    fontSize: 11,
    color: '#7C7C7C',
    fontWeight: '500'
  },
  noteBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1
  },
  note: {
    color: '#4a4a4a',
    fontWeight: '400',
    fontSize: 15,
    paddingTop: 3,
    paddingBottom: 5
  },
  noteTime: {
    fontSize: 12,
    color: '#7C7C7C',
  },
});

export default RoomNoteRow;
