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
  aic,
  jcc,
  padding,
  flxCol,
  flx3,
  flx2,
  flx1,
  margin,
  text,
  greyDk,
  circle,
  green
} from 'rc-mobile-base/lib/styles';

import { taskOptions, userType } from './utils';
import { unixPrettyDate } from 'rc-mobile-base/lib/utils/dates';

import RowBase from './RowBase';
import Status from './Status';
import TaskModal from './TaskModal';

export const Row = ({ index, toggleModal, ...props }) => (
  <RowBase index={index}>
    <TouchableOpacity style={[flxCol, flx2, jcc, { height: 50 }]} onPress={() => toggleModal(<TaskModal task={props} toggleModal={toggleModal} />, { style: { width: 800 }})}>
      <Text style={[text.fw700, margin.x10]}>
        {props.task}
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
          {props.creator && `${props.creator.first_name} ${ props.creator.last_name }`}
        </Text>
        <Text style={[text.b3, greyDk.text]}>
          { userType(props.creator) }
        </Text>
      </View>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <Text style={[text.fw700]}>
        { unixPrettyDate(props.date_ts) }
      </Text>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <Text style={[text.fw700]}>
        { props.assigned.label }
      </Text>
    </View>
    <View style={{ width: 5 }}></View>
    <View style={[flxCol, flx1]}>
      <Status task={props} />
    </View>
  </RowBase>
)

export default Row
