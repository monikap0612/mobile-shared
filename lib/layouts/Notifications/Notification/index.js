import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

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

export const Notification = ({ task, sent }) => (
  <View style={[flex1, flxRow, white.bg, grey.bc, margin.b5, { height: 60 }]}>
    <View style={[margin.l5]}>
      <Picture
        size={58}
        value={task.meta.image}
      />
    </View>
    <View style={[flex1, margin.l10, flxCol]}>
      <Text style={[text.fw700, margin.t5, flxRow, slate.text, {fontSize: 15}]}>
        {task.task}
      </Text>
      <View style={[jcsb, aife, flxRow, margin.t15]}>
        <Info personName={"Arron Marz"} roomName={task.roomName} />
        <TimeAgo value={task.date_ts} />
      </View>
    </View>
  </View>
)

export default Notification
