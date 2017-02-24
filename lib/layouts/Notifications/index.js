import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash/lang';
import { createStructuredSelector } from 'reselect';
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
    const { assigned, sent, navigation } = this.props;

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
          hideShadow
          buttonColor={blue500.color}
          onPress={() => navigation.navigate('CreateNotification')}
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
