import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import { Divider } from '@shoutem/ui';

import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

import DrawerButton from './drawer-button';

import RoomsActions from 'rc-mobile-base/lib/actions/rooms';
import AuthActions from 'rc-mobile-base/lib/actions/auth';

class DrawerContent extends Component {
  toggleDrawer () {
    this.context.drawer.toggle();
  }

  handlePressMain = () => {
    this.toggleDrawer();
    NavigationActions.mainLayout();
  }

  handlePressGlitches = () => {
    this.toggleDrawer();
    NavigationActions.glitchesLayout();
  }

  handlePressTasks = () => {
    this.toggleDrawer();
    NavigationActions.tasksLayout();
  }

  handlePressInventoryRestock = () => {
    this.toggleDrawer();
    NavigationActions.inventoryRestockLayout();
  }

  handlePressLogout = () => {
    this.props.logout();
  }

  handlePress = () => () => {
    this.toggleDrawer();
  }

  render() {
    try {
      const { auth: { user: { image, first_name, last_name }, hotel: { name: hotelName }} } = this.props

      return (
        <View style={styles.container}>
          <View style={styles.userSection}>
            <Image style={styles.thumbnail} source={ image ? { uri: image } : require('../images/bellhop.png') } />
            <View style={styles.userInfo}>
              <Text>{ `${first_name} ${last_name}` }</Text>
              <Text>{ hotelName }</Text>
            </View>
          </View>
          <Divider styleName="line" />
          <View style={styles.navigationContainer}>
            <DrawerButton icon='home' text='Main' onPress={this.handlePressMain} />
            <DrawerButton icon='exclamation-triangle' text='Glitches' onPress={this.handlePressGlitches} />
            <DrawerButton icon='check-square' text='Tasks' onPress={this.handlePressTasks} />
            <DrawerButton icon='list-ol' text='Inventory Restock' onPress={this.handlePressInventoryRestock} />
            <DrawerButton icon='sign-out' text='Logout' onPress={this.handlePressLogout} />
          </View>
          <Divider styleName="line" />
          <View style={styles.footerContainer}>
            <Image style={styles.footerLogo} source={ require('../images/splash-sm.png') }/>
          </View>
        </View>
      )
    } catch (e) {
      this.handlePressLogout()

    }
    return <View></View>
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  userSection: {
    flexDirection: 'row',
    marginBottom: 20
  },
  thumbnail: {
    height: 64,
    width: 64,
    borderRadius: 32
  },
  userInfo: {
    paddingLeft: 10,
    paddingTop: 16
  },
  navigationContainer: {
    flex: 1,
    minHeight: 50,
  },
  footerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerLogo: {
    flexGrow: 1,
    height: 144,
    width: 240,
    marginLeft: 0,
    marginRight: 0
  }
});

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout()),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
