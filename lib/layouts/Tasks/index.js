import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { Actions as NavigationActions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';

import {
  blue500
} from '../../styles';

import { taskUpdate } from '../../actions/updates';

import TaskList from '../../components/TaskList';
import Screen from '../../components/Screen';

import { selectTasks, activeTabSelector } from './selectors';
import { setActiveTab } from './actions';

import Header from './Header';
import Search from './Search';
import Tabs from './Tabs';
import Tab from './Tab';

class TasksLayout extends Component {

  handleSelectTask = (task) => NavigationActions.taskLayout({title: task.task})
  handleSelectActivity = (task, activity) => this.props.updateTask(task.uuid, activity.status)

  render() {
    const { tasks, activeTab, tabToggle } = this.props;

    return (
      <Screen>
        <Header>
          <Search />
          <Tabs activeTab={activeTab} onPress={tabToggle} />
        </Header>

        <Tab
          value={0}
          active={activeTab}
        >
          <TaskList
            sectionId="dueDateDisplay"
            tasks={tasks}
            onPress={this.handleSelectTask}
          />
        </Tab>
        <Tab
          value={1}
          active={activeTab}
        >
          <TaskList
            sectionId="dueDateDisplay"
            tasks={[]}
            onPress={this.handleSelectTask}
          />
        </Tab>

        <ActionButton
          hideShadow
          buttonColor={blue500.color}
          onPress={NavigationActions.taskLayout}
        />
      </Screen>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  tasks: selectTasks,
  activeTab: activeTabSelector,
});

const mapDispatchToProps = (dispatch) => ({
  updateTask: (uuid, status) => dispatch(taskUpdate({ uuid, status })),
  tabToggle: (tab) => dispatch(setActiveTab(tab)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksLayout);
