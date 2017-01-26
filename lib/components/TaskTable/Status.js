import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import {
  margin,
  flxRow,
  flxCol,
  circle,
  green,
  aic,
  red,
  taskCompleted,
  taskStarted,
  taskAccepted,
  taskWaiting,
  taskPending,
  taskCancelled,
} from 'rc-mobile-base/lib/styles';

import H2 from '../H2';

const buildStatus = (task) => {
  if (task.is_completed) {
    return { label: 'Finished', color: taskCompleted }
  }
  if (task.is_cancelled) {
    return { label: 'Canceled', color: taskCancelled }
  }
  if (task.is_paused) {
    return { label: 'Paused', color: taskWaiting }
  }
  if (task.is_started) {
    return { label: 'Started', color: taskStarted }
  }
  if (task.is_claimed) {
    return { label: 'Waiting', color: taskWaiting }
  }
  if (task.is_rejected) {
    return { label: 'Rejected', color: taskCancelled }
  }
  return { label: 'Pending', color: taskPending }
}

export const Status = ({ task }) => {
  const status = buildStatus(task);

  return (
    <View style={[flxRow, aic]}>
      <View style={[flxCol, circle(5), status.color.bg, margin.r5]}>
      </View>
      <View style={[flxCol]}>
        <H2>{ status.label }</H2>
      </View>
    </View>
  )
}
export default Status
