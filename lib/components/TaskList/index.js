import React, { Component } from 'react';
import { ListView } from '@shoutem/ui'
import { isEmpty } from 'lodash/lang';

import TaskRow from '../TaskRow';
import SwipeoutOptions from './SwipeoutOptions';

export class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      scrollEnabled: true,
    };
  }

  handleScroll = (scrollEnabled) => {
    this.setState({ scrollEnabled });
  }

  handleSwipeoutPress = (task, activity) => {
    this.props.onSwipeoutPress(task, activity);
    this.props.closeModal()
  }

  handleSwipeout = (task, activity) => {
    const onSwipeoutPress = this.props.onSwipeoutPress;
    if (!isEmpty(activity.children)) {
      const modal = (
        <SwipeoutOptions
          value={activity.children}
          task={task}
          onPress={onSwipeoutPress}
          close={this.props.closeModal}
        />
      )
      return this.props.openModal(modal, { style: [{width: 250, height: 300}] });
    }

    return onSwipeoutPress(task, activity);
  }

  render() {
    const { tasks, sectionId, onPress, onSwipeoutPress, renderHeader, ...props } = this.props;
    return (
      <ListView
        data={tasks}
        scrollEnabled={this.state.scrollEnabled}
        renderRow={(task) => (
          <TaskRow
            task={task}
            onPress={onPress}
            onSwipeoutPress={onSwipeoutPress && this.handleSwipeout}
            onScroll={onSwipeoutPress && this.handleScroll}
          />
        )}
        renderSectionHeader={renderHeader}
        getSectionId={(task) => task[sectionId]}
        {...props}
      />
    )
  }
}

export default TaskList
