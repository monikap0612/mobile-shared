import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';

import {
  flexGrow1,
  padding,
  margin,
  white
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

export const FormContent = ({ handleSubmit, users, locations, onSubmit, ...props }) => (
  <View style={[flexGrow1]}>
    <ScrollView>
      <Field
        options={standardsOptions}
        label="Select Notification"
        name="quickNotification"
        component={RecentNQuick}
      />
      <View style={[padding.a10]}>
        <SectionHeader value="To:" />
        <Field
          options={users}
          label="Select User"
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
        <View style={[white.bg, { height: 95 }]}>
          <FormField
            multiline
            numberOfLines={4}
            placeholder="Enter in a message..."
            style={[padding.x15, {borderWidth: 2}]}
            name="message"
          />
        </View>

        <SectionHeader value="Photo:" />
        <Field
          name="photo"
          style={[{width: 200, height: 200}]}
          component={PhotoField}
        />
      </View>
    </ScrollView>

    <SubmitButton onPress={handleSubmit(onSubmit)} />
  </View>
)

export const Form = reduxForm({
  form: 'createNotificationForm',
  enableReinitialize: true
})(FormContent)

export default Form
