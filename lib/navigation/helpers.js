import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

const toggleDrawer = (nav) => () => {
  const state = nav.navigationState;
  const open = !state.open;
  NavigationActions.refresh({
    key: 'drawer',
    open
  })
};

export const NavHelpers = {
  backButton (nav) {
    if (nav.hideBackButton) {
      return null;
    }
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon
          name='angle-left'
          size={24}
          color={'white'}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  downButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon
          name='angle-down'
          size={24}
          color={'white'}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton (nav) {
    return (
      <TouchableOpacity onPress={toggleDrawer(nav)}>
        <Icon
          name='bars'
          size={24}
          color={'white'}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  navButtonLeft: {
    marginTop: Platform.OS === 'ios' ? -27 : -15,
    marginLeft: 5,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'transparent',
    color: 'white',
    width: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
});

export default NavHelpers;
