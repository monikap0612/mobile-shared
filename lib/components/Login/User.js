import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Field, reduxForm } from 'redux-form';
import { ListView } from '@shoutem/ui';

import {
  margin,
  padding,
  opacityWhite,
  blue300,
  transparent,
  jcc
} from '../../styles';

import TextField, { TextFieldWithRef } from '../TextField';

import styles from './styles';
import logo from './logo.png';
import UserSelect from './UserSelect';
import DisplayError from './DisplayError';

const renderUser = (user, index) => <Field name="username" key={index} user={user} component={UserSelect} />

export class UserLogin extends Component {
  render() {
    const { hotel, handleSubmit, submitUserLogin, hotelReset, error } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.hotelNameContainer}>
            <Image source={{ uri: hotel.image }} style={styles.logoImage}/>
            <View style={styles.backButtonContainer}>
              <Icon.Button
                name="arrow-left"
                size={16}
                onPress={hotelReset}
                {...blue300.bg}
              >
                Hotel
              </Icon.Button>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>
              {hotel.name}
            </Text>
          </View>
          <View style={[padding.a10, jcc]}>
            <ListView
              horizontal={true}
              data={hotel.users}
              renderRow={(user) => <Field name="username" user={user} component={UserSelect} />}
            />
          </View>
          {error && <DisplayError error={error} />}
          <View style={styles.inputs}>
            <View style={[styles.inputContainer, margin.b15]}>
              <Field
                autoCapitalize="none"
                returnKeyType="next"
                autoCorrect={false}
                selectTextOnFocus={false}
                name="username"
                style={styles.inputField}
                placeholder='Username'
                underlineColorAndroid={transparent.color}
                placeholderTextColor={opacityWhite.p60.color}
                component={TextField}
                onSubmitEditing={() => {
                  this.passwordInput.focus()
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Field
                refName={(ref) => this.passwordInput = ref}
                name="password"
                autoCapitalize="none"
                returnKeyType="send"
                autoCorrect={false}
                secureTextEntry
                style={styles.inputField}
                component={TextFieldWithRef}
                placeholder='Password'
                underlineColorAndroid={transparent.color}
                placeholderTextColor={opacityWhite.p60.color}
                onSubmitEditing={handleSubmit(submitUserLogin)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.btnContainer}>
          <Icon.Button
            name="paper-plane"
            activeOpacity={8}
            padding={5}
            size={32}
            backgroundColor={transparent.color}
            onPress={handleSubmit(submitUserLogin)}
          />
        </View>
      </View>
    )
  }
}

export default reduxForm({
  form: 'userLogin'
})(UserLogin)
