import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Field, reduxForm } from 'redux-form';

import logo from '../../images/logo.png';
import { opacityWhite, blue300, transparent } from '../../styles/colors';
import { margin } from '../../styles/positioning';

import TextField from '../TextField';

import styles from './styles';
import UserSelect from './UserSelect';

const renderUser = (user, index) => <Field name="username" key={index} user={user} component={UserSelect} />

export const UserLogin = ({ hotel, handleSubmit, submitUserLogin, hotelReset }) => (
  <View style={styles.container}>
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
    <View style={styles.usersContainer}>
      {hotel.users && hotel.users.map(renderUser)}
    </View>
    <View style={styles.inputs}>
      <View style={[styles.inputContainer, margin.b15]}>
        <Field
          name="username"
          style={styles.inputField}
          placeholder='Username'
          underlineColorAndroid={transparent.color}
          placeholderTextColor={opacityWhite.p60.color}
          component={TextField}
        />
      </View>
      <View style={styles.inputContainer}>
        <Field
          name="password"
          secureTextEntry
          style={styles.inputField}
          placeholder='Password'
          underlineColorAndroid={transparent.color}
          placeholderTextColor={opacityWhite.p60.color}
          component={TextField}
        />
      </View>
    </View>
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

export default reduxForm({
  form: 'userLogin'
})(UserLogin)
