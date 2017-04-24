import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';
import I18n from 'react-native-i18n';

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
          label={I18n.t('inspector.create-notification.index.send-notification')}
          onPress={(option) => {
            change('message', option.message)
            change('photo', { id: null, path: option.image, predefined: true })
          }}
        />

        <View style={[padding.x10]}>
          <SectionHeader value={I18n.t('base.ubiquitous.to')} />
          <Field
            options={users}
            label={I18n.t('base.ubiquitous.select-user')}
            name="user"
            component={SelectUser}
          />

          <SectionHeader value={I18n.t('base.ubiquitous.locations')} />
          <FieldArray
            name="locations"
            options={locations}
            label="Select Location"
            component={SelectLocation}
          />

          <SectionHeader value={I18n.t('base.ubiquitous.message')} />
          <View style={[white.bg, grey400.bc, {height: 95}]}>
            <FormField
              multiline
              numberOfLines={4}
              placeholder={I18n.t('base.ubiquitous.enter-a-message')}
              style={[padding.x15, {borderWidth: 2}]}
              name="message"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={[padding.x10, margin.b20]}>
        <SectionHeader value={I18n.t('base.ubiquitous.photo')} />
        <Field
          name="photo"
          style={[{width: 200, height: 200}]}
          component={PhotoField}
        />
      </View>

      <SubmitButton
        valid={valid}
        onPress={handleSubmit(onSubmit)}
        />
    </ScrollView>
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
