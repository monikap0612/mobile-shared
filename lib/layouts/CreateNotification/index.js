import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash/lang';
import { createStructuredSelector } from 'reselect';
import { Actions as NavigationActions } from 'react-native-router-flux'

import Screen from '../../components/Screen';
import { userSelector } from '../../selectors/auth';

import Form from './Form';
import { usersSelector } from './selectors';

class CreateNotificationLayout extends Component {
  render() {
    const { users, defaultUser } = this.props
    return (
      <Screen>
        <Form
          initialValues={{user: defaultUser}}
          users={users}
        />
      </Screen>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  users: usersSelector,
  defaultUser: userSelector
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotificationLayout);
