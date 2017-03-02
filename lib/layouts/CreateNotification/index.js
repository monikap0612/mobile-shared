import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash/lang';
import { createStructuredSelector } from 'reselect';
import { change } from 'redux-form';

import Screen from '../../components/Screen';
import { userSelector } from '../../selectors/auth';
import UpdatesActions from '../../actions/updates';

import Form from './Form';
import { usersSelector, defaultUserSelector, locationsSelector } from './selectors';
import { buildNotifications } from './utils';

class CreateNotificationLayout extends Component {
  handleSubmit = (values) => {
    const { users, createNotification, navigation } = this.props
    const notifications = buildNotifications(values, users)
    notifications.map(createNotification)
    navigation.goBack();
  }

  render() {
    const { users, defaultUser, locations } = this.props
    return (
      <Screen>
        <Form
          initialValues={{user: defaultUser}}
          users={users}
          locations={locations}
          onSubmit={this.handleSubmit}
        />
      </Screen>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  users: usersSelector,
  defaultUser: defaultUserSelector,
  locations: locationsSelector,
});

const mapDispatchToProps = (dispatch) => ({
  createNotification: (props) => dispatch(UpdatesActions.notificationCreate(props)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotificationLayout);
