import React, { PropTypes, Component } from 'react'
import { StyleSheet } from 'react-native';
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions as NavigationActions } from 'react-native-router-flux'
import { omit } from 'lodash/object';

const sanitizeProps = (props) => omit(props, ['type', 'open', 'onOpen', 'onClose', 'content', 'styles']);

export const DrawerCreator = (drawerContent, params) => (props) => {
  const state = props.navigationState;
  const children = state.children;

  return (
    <Drawer
      type='overlay'
      open={state.open}
      onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
      onClose={() => NavigationActions.refresh({key: state.key, open: false})}
      content={drawerContent}
      styles={styles}
      tapToClose
      openDrawerOffset={(viewport) => viewport.width - 360}
      panCloseMask={0}
      negotiatePan
      tweenHandler={(ratio) => ({
        main: { opacity: Math.max(0.54, 1 - ratio) }
      })}
      {...sanitizeProps(params)}
    >
      <DefaultRenderer navigationState={children[0]} onNavigate={props.onNavigate} />
    </Drawer>
  )
}

const styles = {
  drawer: {
    shadowColor: '#4a4a4a',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: {
    backgroundColor: 'black'
  }
};

export default DrawerCreator;
