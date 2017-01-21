import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { isEmpty } from 'lodash/lang';

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
    <View style={[flex1, margin.l10, flxCol]}>
      <Text style={[text.fw700, margin.t5, flxRow, slate.text, {fontSize: 15}]}>
        {task.task}
      </Text>
      <View style={[jcsb, aife, flxRow, margin.t15]}>
        <Info personName={task.assigned.user_ids[0] && task.assigned.label} roomName={task.meta.location} />
        <TimeAgo value={task.date_ts} />
      </View>
    </View>
  </View>
)

export default Notification
