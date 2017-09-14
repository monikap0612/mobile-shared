import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import Status from './Status';

import {
  white,
  grey400,
  aic,
  aife,
  jcfs,
  jcsb,
  jcc,
  padding,
  flxRow,
  slate,
  greyDk,
  margin,
} from 'rc-mobile-base/lib/styles';

const RoomRow = ({ room, activateRoom, displayUser }) => {
  const { name, turndownService, guests, guestStatus, roomCategory, turndownUser } = room;
  const isDone = ['finish', 'dnd', 'refuse'].includes(turndownService);
  const currentGuest = guests && guests.length && guests[guests.length-1];

  return (
    <TouchableOpacity style={styles.container} onPress={() => activateRoom(room._id)}>
      <View style={[flxRow, jcsb, aife]}>
        <Text style={styles.roomName}>{ `${name}` }</Text>
        <Status status={turndownService} />
      </View>
      <View style={[flxRow, aic, jcsb]}>
        <View style={[flxRow, aic]}>
          <Text style={styles.guestName}>{ `${roomCategory.label}` }</Text>
          { currentGuest ?
            <Text style={styles.guestName}>{ ` · ${currentGuest.name} (${currentGuest.occupants}) · ${guestStatus.toUpperCase()}` }</Text>
            : null
          }
        </View>
        {
          displayUser && turndownUser ? (
            <View style={[flxRow, aic]}>
              <Image
                style={[margin.r5, {width: 20, height: 20, borderRadius: 5}]}
                source={{uri: turndownUser.image}}
              />
              <Text>
                {turndownUser.first_name} {turndownUser.last_name}
              </Text>
            </View>
          ) : (
            null
          )
        }
      </View>
      { isDone ?
        <View style={styles.overlay}></View>
        : null
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 4,
    marginRight: 4,
    marginLeft: 4,
    ...jcc,
    // ...aic,
    borderColor: grey400.color,
    ...white.bg,
    borderWidth: 1,
    borderRadius: 2,
    ...padding.x5,
    // ...flxRow
  },
  roomName: {
    ...slate.text,
    fontSize: 17
  },
  roomCategory: {
    ...slate.text,
    opacity: .9,
    marginLeft: 4,
    fontSize: 14
  },
  guestName: {
    ...greyDk.text,
    marginTop: 5,
    fontSize: 13
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.15)'
  }
});

RoomRow.defaultProps = {
  displayUser: false
}

export default RoomRow;
