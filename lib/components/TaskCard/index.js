import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  margin,
  padding,
  flxRow,
  flxCol,
  slate,
  white,
  grey,
  green,
  red,
  aic,
  jcc,
  greyDk,
  text
} from '../../styles';

import Picture from '../Picture';
import H2 from '../H2';
import Button from '../Button';
import ModalToggler from '../ModalToggler';
import SwipeoutOptions from '../TaskRow/SwipeoutOptions';

import TimeAgo from './TimeAgo';
import Status from './Status';
import SectionHeader from './SectionHeader';

const ActivityBase = ({ activity, task, onPress }) => (
  <Button
    key={activity.text}
    style={[margin.x5, {backgroundColor: activity.backgroundColor}]}
    onPress={() => onPress(task, activity)}
  >
    <Text
      style={[text.center, {color: activity.color, width: 80}]}
      numberOfLines={1}
      ellipsizeModel="tail"
    >
      {activity.text}
    </Text>
  </Button>
)

const Activity = ({ activity, task, onPress }) => activity.children ? (
  <ModalToggler
    modalProps={{
      transparent: true
    }}
    renderValue={(toggle) => (
      <ActivityBase
        activity={activity}
        onPress={toggle}
      />
    )}
    renderModal={(toggle) => (
      <SwipeoutOptions
        value={activity.children}
        task={task}
        onPress={onPress}
        close={toggle}
      />
    )}
  />
) : (
  <ActivityBase activity={activity} task={task} onPress={onPress} />
)

const TaskCard = ({ task, onClose, onPress }) => {
  const [assetName, taskAction] = task.task.split(':').map(i => i.trim());

  return (
    <View>
      <View style={[white.bg, padding.a10, padding.b15]}>
        <View style={[flxRow]}>
          <Picture
            value={task.meta.image}
            size={120}
          />
          <View style={[margin.l10, flxCol]}>
            <Text
              style={[slate.text, text.fw600, margin.r10, {width: 190, fontSize: 15}]}
              numberOfLines={1}
              ellipsizeModel="tail"
            >
              {assetName}
            </Text>
            <Text
              style={[greyDk.text, text.fw600, {width: 190}]}
              numberOfLines={1}
              ellipsizeModel="tail"
            >
              {taskAction}
            </Text>
            <TimeAgo value={task.date_ts} />
            <Status task={task} />
          </View>
          <TouchableOpacity onPress={onClose} style={[padding.a0]}>
            <Icon
              name="times"
              size={24}
              color={red.color}
            />
          </TouchableOpacity>
        </View>

        <SectionHeader value="Location" />
        <View style={[flxRow]}>
          <View style={[flxRow, aic]}>
            <Icon
              name="user"
              style={[flxCol, margin.r5]}
              color={task.room.isGuestIn ? green.color : red.color}
            />
            <Text style={[greyDk.text]}>
              {task.room.name}
            </Text>
          </View>
        </View>

        <SectionHeader value="Creator" />
        <Text style={[greyDk.text]}>
          {task.creator.fullName}
        </Text>

        <SectionHeader value="Last Message" />
        <Text style={[greyDk.text]}>
          {task.lastMessage}
        </Text>
      </View>
      <View style={[flxRow, grey.bg, aic, jcc, padding.y5, {height: 55}]}>
        {
          onPress && task.activities.map(activity => (
            <Activity
              key={activity.text}
              activity={activity}
              task={task}
              onPress={onPress}
            />
          ))
        }
      </View>
    </View>
  )
}

export default TaskCard
