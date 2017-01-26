import React, { Component } from 'react';
import { ListView } from '@shoutem/ui'
import { isEmpty } from 'lodash/lang';

import TaskRow from '../TaskRow';

import SectionHeader from './SectionHeader';

export class TaskList extends Component {
  state = {
    scrollEnabled: true,
  }

  handleScroll = (scrollEnabled) => {
    this.setState({ scrollEnabled });
  }

  handleSwipeout = (task, activity) => {
    this.props.onSwipeoutPress(task, activity);
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
        renderSectionHeader={renderHeader ? renderHeader : (section) => <SectionHeader value={section} />}
        getSectionId={(task) => task[sectionId]}
        {...props}
      />
    )
  }
}

export default TaskList
