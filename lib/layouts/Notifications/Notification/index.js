import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { isEmpty } from 'lodash/lang';
import { get } from 'lodash/object';

import {
  flxRow,
  flxCol,
  white,
  grey,
  margin,
  jcsb,
  flex1,
  aife,
  text,
  slate
} from 'rc-mobile-base/lib/styles';

import Picture from '../../../components/Picture';

import Info from './Info';
import TimeAgo from './TimeAgo';
import Status from './Status';

export const Notification = ({ task, sent }) => (
  <View style={[flex1, flxRow, white.bg, grey.bc, margin.b5, { height: 60 }]}>
    <Status received={task.is_completed === 1} show={sent} />
    <Picture
      size={58}
      value={task.meta.image}
    />
    <TouchableOpacity style={[flex1, margin.l10, flxCol]}>
      <Text style={[text.fw700, margin.t5, flxRow, slate.text, {fontSize: 15}]}>
        {task.task}
      </Text>
      <View style={[jcsb, aife, flxRow, margin.t15]}>
        <Info personName={sent ? task.assigned.user_ids[0] && task.assigned.label : `${get(task, 'creator.first_name')} ${get(task, 'creator.last_name')}`} roomName={task.meta.location} />
        <TimeAgo value={task.date_ts} />
      </View>
    </TouchableOpacity>
  </View>
)

export default Notification
