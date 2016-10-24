import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Field, reduxForm } from 'redux-form';

import TextField from '../TextField';
import logo from '../../images/splash-sm.png';
import { opacityWhite, transparent } from '../../styles/colors';

import styles from './styles';

export const HotelLogin = ({ submitHotelLogin, handleSubmit}) => (
  <View style={styles.container}>
    <View style={styles.hotelContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logoImage}/>
      </View>
      <View style={styles.hotelInfoContainer}>
        <Text style={[styles.text, styles.header]}>
          RoomChecking: Runner
        </Text>
        <Text style={[styles.text, styles.subheader]}>
          Please enter in your hotel
        </Text>
      </View>
      <View style={styles.hotelInputContainer}>
        <Field
          style={styles.hotelInput}
          underlineColorAndroid={transparent.color}
          placeholderTextColor={opacityWhite.p60.color}
          placeholder='Hotel Name'
          name="hotel"
          component={TextField}
        />
      </View>
      <View style={styles.hotelBtnContainer}>
        <Icon.Button
          name="paper-plane"
          size={32}
          backgroundColor={transparent.color}
          onPress={handleSubmit(submitHotelLogin)}
        />
      </View>
    </View>
  </View>
)

export default reduxForm({
  form: 'hotelLogin'
})(HotelLogin)
