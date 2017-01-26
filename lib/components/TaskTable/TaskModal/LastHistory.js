import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { last } from 'lodash/array';
import { get } from 'lodash/object';
import moment from 'moment';

import {
  slate
} from 'rc-mobile-base/lib/styles';

const LastHistory = ({ task, indexUser }) => {
  const update = last(get(task, 'updates', []));
  const time = update && update.update_ts || task.date_ts;
  let label, info;

  if (!update) {
    label = 'Created';
  } else if (update.update_type === 'status') {
    label = update.status;
  } else if (update.is_move) {
    label = 'Reassigned Task';
    info = `${get(update, 'assigned.label') || ''} · ${moment(update.due_date).format('ll')}`;
  } else if (update.is_reschedule) {
    label = 'Reschedule Due Date';
    info = `${get(update, 'assigned.label') || ''} · ${moment(update.due_date).format('ll')}`;
  } else if (update.message){
    label = 'Added Message';
  }

  return (
    <View>
      <Text style={styles.valueStyle}>{ label }</Text>
      { info ?
        <Text style={styles.subvalueStyle}>{ info }</Text>
        : null
      }
      <Text style={styles.subvalueStyle}>{ moment.unix(time).format('ll') }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  valueStyle: {
    fontSize: 17,
    ...slate.text,
    fontWeight: '500',
    opacity: .9
  },
  subvalueStyle: {
    fontSize: 14,
    ...slate.text,
    opacity: .8,
    marginTop: 2
  }
});

export default LastHistory;
