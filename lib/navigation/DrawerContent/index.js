import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { Divider } from '@shoutem/ui';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

import AuthActions from '../../actions/auth';
import { userInfoSelector, hotelNameSelector } from '../../selectors/auth';

import DrawerButton from './DrawerButton';
import bellhopImage from './bellhop.png';
import splashSmImage from './splash-sm.png';

class DrawerContent extends Component {
  render() {
    const toggleDrawer = this.context.drawer.toggle;
    const logout = this.props.logout;

    try {
      const { userInfo, hotelName, links } = this.props

      return (
        <View style={styles.container}>
          <View style={styles.userSection}>
            <Image style={styles.thumbnail} source={ userInfo.image ? { uri: userInfo.image } : bellhopImage } />
            <View style={styles.userInfo}>
              <Text>
                {userInfo.fullName}
              </Text>
              <Text>
                {hotelName}
              </Text>
            </View>
          </View>
          <Divider styleName="line" />
          <View style={styles.navigationContainer}>
            {
              links.map((link, index) => (
                <DrawerButton
                  key={index}
                  icon={link.icon}
                  text={link.text}
                  onPress={() => {
                    toggleDrawer()
                    NavigationActions[link.transition]();
                  }}
                />
              ))
            }
            <DrawerButton
              icon="sign-out"
              text="Logout"
              onPress={logout}
            />
          </View>
          <Divider styleName="line" />
          <View style={styles.footerContainer}>
            <Image style={styles.footerLogo} source={splashSmImage}/>
          </View>
        </View>
      )
    } catch (e) {
      logout()
    }
    return <View></View>
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFF'
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

const mapStateToProps = createStructuredSelector({
  userInfo: userInfoSelector,
  hotelName: hotelNameSelector
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
