import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

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

import TimeAgo from './TimeAgo';
import Status from './Status';
import SectionHeader from './SectionHeader';

const TaskCard = ({ task, onClose }) => {
  const [assetName, taskAction] = task.task.split(':');

  return (
    <View>
      <View style={[white.bg, padding.a5, padding.b15]}>
        <View style={[flxRow]}>
          <Picture
            value={task.meta.image}
            size={120}
          />
          <View style={[margin.l5, margin.t5, flxCol]}>
            <H2
              style={[slate.text, { width: 200}]}
              numberOfLines={1}
              maxLength={15}
              ellipsizeModel="tail"
            >
              {assetName}
            </H2>
            <H2>{taskAction}</H2>
            <TimeAgo value={task.date_ts} />
            <Status task={task} />
          </View>
          <TouchableOpacity onPress={onClose}>
            <Icon
              name="cross"
              size={30}
              color={red.color}
            />
          </TouchableOpacity>
        </View>

        <SectionHeader value="Location" />
        <View style={[flxRow, margin.l10]}>
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
        <Text style={[greyDk.text, margin.l10]}>
          {task.creator.fullName}
        </Text>

        <SectionHeader value="Last Message" />
        <Text style={[greyDk.text, margin.l10]}>
          {task.lastMessage}
        </Text>
      </View>
      <View style={[flxRow, grey.bg, aic, jcc, padding.y5, {height: 55}]}>
        {
          task.activities.map(activity => (
            <Button
              key={activity.text}
              style={[margin.x5, {backgroundColor: activity.backgroundColor}]}
              onPress={activity.onPress}
            >
              <Text
                style={[text.center, {color: activity.color, width: 80}]}
                numberOfLines={1}
                ellipsizeModel="tail"
              >
                {activity.text}
              </Text>
            </Button>
          ))
        }
      </View>
    </View>
  )
}

export default TaskCard
