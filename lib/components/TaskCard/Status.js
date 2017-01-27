import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {
  taskCompleted,
  taskStarted,
  taskAccepted,
  taskWaiting,
  taskPending,
  taskCancelled,
  taskUnclaimed,
  white,
  jcc,
  aic,
  text,
  margin
} from 'rc-mobile-base/lib/styles';

const getStatus = (task) => {
  if (task.is_completed) {
    return {
      color: taskCompleted,
      text: "COMPLETED"
    }
  } else if (task.is_cancelled) {
    return {
      color: taskCancelled,
      text: "CANCELLED"
    }
  } else if (task.is_paused) {
    return {
      color: taskPending,
      text: "PENDING"
    }
  } else if (task.is_started) {
    return {
      color: taskStarted,
      text: "STARTED"
    }
  } else if (task.is_claimed) {
    return {
      color: taskAccepted,
      text: "ACCEPTED"
    }
  } else {
    return {
      color: taskUnclaimed,
      text: "UNCLAIMED"
    }
  }
  return {
    color: taskUnclaimed,
    text: "UNCLAIMED"
  }
}

export const Status = ({ task }) => {
  const status = getStatus(task)
  return (
    <View style={[status.color.bg, margin.t25, jcc, aic, {width: 100, height: 40}]}>
      <Text style={[white.text, text.fw700]}>
        {status.text}
      </Text>
    </View>
  )
}

export default Status
