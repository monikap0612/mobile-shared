import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash/lang';
import { createStructuredSelector } from 'reselect';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { change } from 'redux-form';

import Screen from '../../components/Screen';
import { userSelector } from '../../selectors/auth';
import UpdatesActions from '../../actions/updates';

import Form from './Form';
import { usersSelector, locationsSelector } from './selectors';
import { buildNotifications } from './utils';

class CreateNotificationLayout extends Component {
  handleSubmit = (values) => {
    const { users, createNotification, uploadPhoto } = this.props
    if (values.photo && !values.photo.predefined) {
      uploadPhoto(values.photo.path, values.photo.id)
    }
    const notifications = buildNotifications(values, users)
    notifications.map(createNotification)
    NavigationActions.pop()
  }

  render() {
    const { users, locations } = this.props
    return (
      <Screen>
        <Form
          initialValues={{user: users[0]}}
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
  locations: locationsSelector,
});

const mapDispatchToProps = (dispatch) => ({
  uploadPhoto: (path, id) => dispatch(UpdatesActions.photoUpload({ path, id })),
  createNotification: (props) => dispatch(UpdatesActions.notificationCreate(props)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotificationLayout);
