import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

import {
  flex1,
  flexGrow1
} from 'rc-mobile-base/lib/styles';
import FormField from '../../components/FormField';

import SubmitButton from './SubmitButton';
import RecentNQuick from './RecentNQuick';

import { standardsOptions } from './predefined.json';

console.log('SSSSSSSSSS', standardsOptions)

export const FormContent = ({ handleSubmit, ...props }) => (
  <View style={[flexGrow1]}>
    <ScrollView>
      <Field
        options={standardsOptions}
        label="Select User"
        name="quickNotification"
        component={RecentNQuick}
      />
    </ScrollView>

    <SubmitButton onPress={() => console.log('SSSSSSSSs')} />
  </View>
)

export const Form = reduxForm({
  form: 'createNotificationForm',
  enableReinitialize: true
})(FormContent)

export default Form
