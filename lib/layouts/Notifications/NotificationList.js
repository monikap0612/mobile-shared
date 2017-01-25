import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { ListView } from '@shoutem/ui';

import {
  flxRow,
  flxCol,
  white,
  grey,
  margin,
  jcsb,
  flex1,
  aife
} from 'rc-mobile-base/lib/styles';

import Notification from './Notification';

export const NotificationList = ({ notifications, sent }) => (
  <View style={[margin.t10]}>
    <ListView
      data={notifications}
      renderRow={(task) => <Notification task={task} sent={sent} />}
    />
  </View>
)

export default NotificationList