import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import moment from 'moment';

import {
  eitherGrey_100_200,
  flxRow,
  lCenterCenter,
  aic,
  padding,
  flxCol,
  flx3,
  flx2,
  flx1,
  margin,
  text,
  greyDk,
  circle,
  green,
  orange,
  taskCompleted,
  taskStarted,
  taskAccepted,
  taskWaiting,
  taskPending,
  taskCancelled,
} from 'rc-mobile-base/lib/styles';

import { taskOptions, userType } from './utils';

import RowBase from './RowBase';
import TaskModal from './TaskModal';

const TaskOption = ({ onUpdate, task, status, label, color }) => {
  return (
    <TouchableOpacity
      style={[flxCol, margin.r10, lCenterCenter, { height: 60 }]}
      onPress={() => onUpdate(task.uuid, status)}
    >
      <Text style={[text.underline, text.b1, color && color.text]}>
        { `${label} task`.toUpperCase() }
      </Text>
    </TouchableOpacity>
  )
}

const Options = ({ task, onUpdate }) => {
  const options = taskOptions(task);

  if (!options || !options.length) {
    return null;
  }

  const displayOptions = options.map((option, index) =>
    <TaskOption key={index} task={task} onUpdate={onUpdate} {...option} />
  );

  return (
    <View style={[flxRow]}>
      { displayOptions }
    </View>
  )
}

export const Row = ({ index, onUpdate, toggleModal, ...props }) => (
  <RowBase index={index}>
    <TouchableOpacity style={[flxCol, flx2, { height: 60, justifyContent: 'center' }]} onPress={() => toggleModal(<TaskModal task={props} toggleModal={toggleModal} />, { style: { width: 800 }})}>
      <Text style={[text.fw700, margin.x10]}>
        { props.task }
      </Text>
    </TouchableOpacity>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      {
        !props.hideLocation &&
          <Text style={[text.fw700]}>
            { props.meta.location || 'No Location' }
          </Text>
      }
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <View>
        <Text style={[text.fw700, text.b3]}>
          { props.creator.first_name } { props.creator.last_name }
        </Text>
        <Text style={[text.b3, greyDk.text]}>
          { userType(props.creator) }
        </Text>
      </View>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <Text style={[text.fw700]}>
        { moment.unix(props.date_ts).format('lll') }
      </Text>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx2]}>
      <Options task={props} onUpdate={onUpdate} />
    </View>
  </RowBase>
)

export default Row
