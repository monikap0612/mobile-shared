import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

import TextField from '../TextField';
import styles from './styles';

export const FormField = (props) => (
  <Field
    style={styles.input}
    component={TextField}
    {...props}
  />
)

export default FormField;
