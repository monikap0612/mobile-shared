import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import ListView from 'rc-mobile-base/lib/components/ListView';
import { isEmpty } from 'lodash/lang';

import TaskRow from '../TaskRow';

import SectionHeader from './SectionHeader';

const headerI18n = (title) => ['priority', 'normal', 'unassigned'].includes(title) ? I18n.t(`base.ubiquitous.${title}`) : title;

export class TaskList extends Component {
  state = {
    scrollEnabled: true,
  }

  handleScroll = (scrollEnabled) => this.setState({ scrollEnabled })

  handleSwipeout = (task, activity) => {
    
    this.props.onSwipeoutPress(task, activity);
  }

  render() {
    const { tasks, Row = TaskRow, sectionId, onPress, onSwipeoutPress, renderTask, renderHeader, ...props } = this.props;

    return (
      <ListView
        data={tasks}
        scrollEnabled={this.state.scrollEnabled}
        renderRow={renderTask ? renderTask : (task) => (
          <Row
            task={task}
            onPress={onPress}
            onSwipeoutPress={onSwipeoutPress && this.handleSwipeout}
            onScroll={this.handleScroll}
          />
        )}
        renderSectionHeader={renderHeader ? renderHeader : (section) => <SectionHeader value={headerI18n(section)} />}
        getSectionId={(task) => task[sectionId]}
        {...props}
      />
    )
  }
}

export default TaskList
