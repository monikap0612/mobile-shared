import React from 'react';
import {
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { get } from 'lodash/object';

import NotificationsLayout from 'rc-mobile-base/lib/layouts/Notifications';
import CreateNotificationLayout from 'rc-mobile-base/lib/layouts/CreateNotification';
import TasksLayout from 'rc-mobile-base/lib/layouts/Tasks';
import ConvertTaskLayout from 'rc-mobile-base/lib/layouts/ConvertTask';

import { Back, Hamburger } from './helpers';
import DrawerCreator from './drawer';

TasksLayout.navigationOptions = {
  header: (navigation, header) => ({
    ...header,
    title: 'Tasks',
  })
};

NotificationsLayout.navigationOptions = {
  header: (navigation, header) => ({
    ...header,
    title: 'Notifications',
  })
};

CreateNotificationLayout.navigationOptions = {
  header: (navigation, header) => ({
    ...header,
    title: 'Create Notification',
  })
};

ConvertTaskLayout.navigationOptions = {
  header: (navigation, header) => ({
    ...header,
    title: 'Convert Task',
  })
}

const navigationCreate = (scenes, links) => {
  const MainLayout = scenes.Main && scenes.Main.screen
  const drawer = DrawerCreator(links)

  if (MainLayout) {
    MainLayout.navigationOptions = {
      header: (navigation, header) => ({
        ...header,
        title: 'Home',
        left: <Hamburger onPress={() => navigation.navigate('DrawerOpen')} />
      })
    };
  }
  return DrawerNavigator({
    Main: {
      screen: StackNavigator({
        Tasks: { screen: TasksLayout },
        Notifications: { screen: NotificationsLayout },
        CreateNotification: { screen: CreateNotificationLayout },
        ConvertTask: { screen: ConvertTaskLayout },
        ...scenes,
        Main: { screen: MainLayout },
      }, {
        initialRouteName: 'Main',
        navigationOptions: {
          header: (navigation) => ({
            left: <Back onPress={() => navigation.goBack()} />,
            style: {
              backgroundColor: '#1A8CFF',
            },
            titleStyle: {
              textAlign: 'center',
              color: 'white',
              fontWeight: 'normal',
            },
          })
        }
      })
    },
  }, {
    initialRouteName: 'Main',
    contentComponent: drawer,
  });
}

export const Navigation = { create: navigationCreate }

export * from './helpers'

export default Navigation
