import React, { Component } from 'react';
import {
  View
} from 'react-native';

import {
  jcc
} from 'rc-mobile-base/lib/styles';

import TaskTableBase from '../TaskTableBase';
import H1 from '../H1';

import Row from './Row';
import RowWithOptions from './RowWithOptions';
import Header from './Header';

const renderRow = (onUpdate, toggleModal) => (props) => {
  if (props.withOptions) {
    return (<RowWithOptions onUpdate={onUpdate} toggleModal={toggleModal} {...props} />)
  }
  return (<Row onUpdate={onUpdate} toggleModal={toggleModal} {...props} />)
}

export const TaskTable = ({ tasks, onUpdate, toggleModal, renderHeader, sectionId }) => (
  <TaskTableBase
    tasks={tasks}
    renderRow={renderRow(onUpdate, toggleModal)}
    renderHeader={renderHeader}
    sectionId={'sectionId'}
  />
)

export default TaskTable
