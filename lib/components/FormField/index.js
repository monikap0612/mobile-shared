import {
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { isArray } from 'lodash/lang';

import TextField from '../TextField';
import { margin, greyLt } from '../../styles';

const rowInput = {
  flexGrow: 1,
  borderWidth: 1,
  borderColor: greyLt.color,
  paddingVertical: 0,
  fontSize: 16,
  paddingLeft: 10,
  height: 45,
};

const TheField = ({style, ...props}) => (
  <Field
    style={[rowInput, isArray(style) ? ...style : style]}
    component={TextField}
    {...props}
  />
)

