import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {
  flex1,
} from 'rc-mobile-base/lib/styles';

import Row from './Row';
import { swipeoutButtons } from './utils';

export const TaskRow = ({ onSwipeoutPress, onScroll, task, ...props }) => onSwipeoutPress ? (
 <Swipeout
   scroll={onScroll}
   style={[flex1]}
   right={task.activities.map(activity => ({...activity, onPress: () => onSwipeoutPress(task, activity) }))}
   autoClose={true}
 >
   <Row {...props} task={task} />
 </Swipeout>
) : <Row {...props} task={task} />

export default TaskRow
