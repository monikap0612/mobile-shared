import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';

import {
  flexGrow1,
  padding,
  margin,
  white,
  grey400
} from 'rc-mobile-base/lib/styles';
import FormField from '../../components/FormField';
import TakePhoto from '../../components/TakePhoto';
import PhotoField from '../../components/PhotoField';

import SubmitButton from './SubmitButton';
import SectionHeader from './SectionHeader';
import RecentNQuick from './RecentNQuick';
import SelectUser from './SelectUser';
import SelectLocation from './SelectLocation';

import { standardsOptions } from './predefined.json';

export const FormContent = ({ handleSubmit, users, locations, onSubmit, change, valid, ...props }) => (
  <View style={[flexGrow1]}>
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <RecentNQuick
          options={standardsOptions}
          label="Select Notification"
          onPress={(option) => {
            change('message', option.message)
            change('photo', { id: null, path: option.image, predefined: true })
          }} 
        />

        <View style={[padding.x10]}>
          <SectionHeader value="To:" />
          <Field
            options={users}
            label="Select Recepient"
            name="user"
            component={SelectUser}
          />

          <SectionHeader value="Location(s):" />
          <FieldArray
            name="locations"
            options={locations}
            label="Select Location"
            component={SelectLocation}
          />

          <SectionHeader value="Message:" />
          <View style={[white.bg, grey400.bc, {height: 95}]}>
            <FormField
              multiline
              numberOfLines={4}
              placeholder="Enter in a message..."
              style={[padding.x15, {borderWidth: 2}]}
              name="message"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={[padding.x10]}>
        <SectionHeader value="Photo:" />
        <Field
          name="photo"
          style={[{width: 200, height: 200}]}
          component={PhotoField}
        />
      </View>
    </ScrollView>

    <SubmitButton
      valid={valid}
      onPress={handleSubmit(onSubmit)}
    />
  </View>
)


const validate = values => {
  const errors = {}
  if (!values.message || !values.message.length) {
    errors.message =  'required'
  }
  if (values.user && values.user.value === 'planned') {
    if (!values.locations) {
      errors.locations = { _error: 'required' }
    }
  }
  return errors
}

export const Form = reduxForm({
  form: 'createNotificationForm',
  enableReinitialize: true,
  validate
})(FormContent)

export default Form
