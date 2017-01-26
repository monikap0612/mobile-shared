import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {
  flex1,
} from 'rc-mobile-base/lib/styles';
import ModalToggler from '../ModalToggler';

import SwipeoutOptions from './SwipeoutOptions';
import Row from './Row';
import { swipeoutButtons } from './utils';

export const TaskRow = ({ onSwipeoutPress, onScroll, task, ...props }) => onSwipeoutPress ? (
  <ModalToggler
    modalProps={{
      transparent: true
    }}
    renderValue={(toggle) => (
       <Swipeout
         scroll={onScroll}
         style={[flex1]}
         right={task.activities.map(activity => ({...activity, onPress: () => activity.children ? toggle() : onSwipeoutPress(task, activity) }))}
         autoClose={true}
       >
         <Row {...props} task={task} />
       </Swipeout>
    )}
    renderModal={(toggle) => {
      const withChildren = task.activities.find(activity => activity.children)
      if (!withChildren) {
        return null
      }
      return (
        <SwipeoutOptions
          value={withChildren.children}
          task={task}
          onPress={onSwipeoutPress}
          close={toggle}
        />
      )
    }}
  />
) : <Row {...props} task={task} />

export default TaskRow
