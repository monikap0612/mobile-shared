import React from 'react';
import {
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import I18n from 'react-native-i18n';
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
    title: I18n.t('base.navigation.index.create-notification'),
  })
};

ConvertTaskLayout.navigationOptions = {
  header: (navigation, header) => ({
    ...header,
    title: 'Convert Task',
  })
}

const navigationCreate = (scenes, links, params) => {
  const MainLayout = scenes.Main && scenes.Main.screen
  const drawer = DrawerCreator(links)

  const additionals = params || {}

  if (MainLayout) {
    MainLayout.navigationOptions = {
      header: (navigation, header) => ({
        ...header,
        title: I18n.t('base.navigation.index.home'),
        left: <Hamburger onPress={() => navigation.navigate('DrawerOpen')} />
      })
    };
  }

  const mainStack = StackNavigator({
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

  const router = mainStack.router
  mainStack.router = {
    ...router,
    getStateForAction(action, state) {
      if (!state) {
        return router.getStateForAction(action, state);
      }
      const { type, routeName } = action
      const lastRoute = state.routes[state.routes.length - 1]
      if (type == lastRoute.type && routeName == lastRoute.routeName) {
        console.log('Prevented duplicating transition to route: ', routeName)
        return null
      }
      return router.getStateForAction(action, state);
    },
  };

  return DrawerNavigator({
    Main: { screen: mainStack },
  }, {
    initialRouteName: 'Main',
    contentComponent: drawer,
    ...additionals,
  });
}

export const Navigation = { create: navigationCreate }

export * from './helpers'

export default Navigation
