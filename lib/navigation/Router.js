import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Scene, Router as RFRouter } from 'react-native-router-flux';

export const Router = ({ navigationDrawer, children }) => (
  <RFRouter>
    <Scene key="root">
      <Scene key='drawer' component={navigationDrawer}>
        <Scene
          key='drawerChildrenWrapper'
          navigationBarStyle={styles.navBar}
          titleStyle={styles.title}
          leftButtonStyle={styles.leftButton}
          rightButtonTextStyle={styles.rightButton}
        >
          {children}
        </Scene>
      </Scene>
    </Scene>
  </RFRouter>
);

const styles = {
  navBar: {
    backgroundColor: '#1A8CFF',
    height: 54,
  },
  title: {
    color: 'white',
    marginTop: 0,
    paddingTop: 0
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

export default Router;
