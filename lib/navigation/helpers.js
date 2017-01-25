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
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-left'
          size={24}
          color={'white'}
          style={styles.navButtonLeftHamburger}
        />
      </TouchableOpacity>
    )
  },

  downButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-down'
          size={24}
          color={'white'}
          style={styles.navButtonLeftHamburger}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton (nav) {
    return (
      <TouchableOpacity onPress={toggleDrawer(nav)}>
        <Icon name='bars'
          size={24}
          color={'white'}
          style={styles.navButtonLeftHamburger}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  navButtonLeft: {
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 10,
    backgroundColor: 'transparent',
    color: 'white',
    width: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navButtonLeftHamburger: {
    marginTop: Platform.OS === 'ios' ? -12 : 0,
    paddingTop: 0,
    marginLeft: 0,
    backgroundColor: 'transparent',
    color: 'white',
    width: 50,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default NavHelpers;
