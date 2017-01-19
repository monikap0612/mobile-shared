import React, { Component } from 'react';
import {
  StyleSheet,
  Platform
} from 'react-native';
import {
  Scene,
  Actions as NavigationActions
} from 'react-native-router-flux';

import NotificationsLayout from '../layouts/Notifications';
import CreateNotificationLayout from '../layouts/CreateNotification';

import NavHelpers from './helpers';

const notificationScenes = [
  <Scene 
    key='notificationsLayout' 
    component={NotificationsLayout} 
    title="Notifications" 
    renderBackButton={NavHelpers.backButton}
  />,
  <Scene 
    initial
    key='createNotificationLayout' 
    direction="vertical"
    component={CreateNotificationLayout} 
    title="Create Notification" 
    renderBackButton={NavHelpers.backButton}
  />,
]

export const ScenesCreator = (navigationDrawer, appScenes, params) => {
  let scenes = appScenes;
  if (!params || !params.customNotifications) {
    scenes = [...appScenes, ...notificationScenes]
  }
  return NavigationActions.create(
    <Scene key="root">
      <Scene key='drawer' component={navigationDrawer}>
        <Scene
          key='drawerChildrenWrapper'
          navigationBarStyle={styles.navBar}
          titleStyle={styles.title}
          leftButtonStyle={styles.leftButton}
          rightButtonTextStyle={styles.rightButton}
        >
          {scenes}
        </Scene>
      </Scene>
    </Scene>
  );
}

const styles = {
  navBar: {
    backgroundColor: '#1A8CFF',
    height: 55,
  },
  title: {
    color: 'white',
    marginTop: 0,
    paddingTop: 0,
    bottom: Platform.OS === 'ios' ? 12 : 0,
  },
  leftButton: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    top: 10
  },
  rightButton: {
    marginTop: 0,
    paddingTop: 0
  }
};

export default ScenesCreator
