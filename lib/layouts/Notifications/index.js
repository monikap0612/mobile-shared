import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash/lang';
import { createStructuredSelector } from 'reselect';
import { Actions as NavigationActions } from 'react-native-router-flux'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ActionButton from 'react-native-action-button';

import {
  blue500
} from '../../styles';
import Screen from '../../components/Screen';

import Tabs from './Tabs';
import NotificationList from './NotificationList';

import { assignedNotifications, sentNotifications } from './selectors';

class NotificationsLayout extends Component {
  render() {
    const { assigned, sent } = this.props;

    return (
      <Screen>
        <ScrollableTabView renderTabBar={() => <Tabs />}>
          <View tabLabel="ASSIGNED">
            <NotificationList notifications={assigned} />
          </View>
          <View tabLabel="SENT">
            <NotificationList notifications={sent} sent={true} />
          </View>
        </ScrollableTabView>

        <ActionButton
          buttonColor={blue500.color}
          onPress={NavigationActions.createNotificationLayout}
        />
      </Screen>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  assigned: assignedNotifications,
  sent: sentNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsLayout);
