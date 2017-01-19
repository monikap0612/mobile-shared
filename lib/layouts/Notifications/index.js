import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash/lang';
import { createStructuredSelector } from 'reselect';
import { Actions as NavigationActions } from 'react-native-router-flux'

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Screen from '../../components/Screen';

import Tabs from './Tabs';

class NotificationsLayout extends Component {
  render() {

    return (
      <Screen>
        <ScrollableTabView renderTabBar={() => <Tabs />}>
          <View tabLabel="ASSIGNED">
            <Text>Assigned</Text>
          </View>
          <View tabLabel="SENT">
            <Text>SENT</Text>
          </View>
        </ScrollableTabView>
      </Screen>
    )
  }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsLayout);
