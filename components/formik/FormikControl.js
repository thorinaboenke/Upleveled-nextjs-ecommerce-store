import React from 'react';
import FormikInput from './FormikInput';
import FormikTextarea from './FormikTextarea';
import FormikSelect from './FormikSelect';
import FormikRadio from './FormikRadio';
import FormikCheckbox from './FormikCheckbox';
// dicides which form fields have to be rendered based on one particular prop:
function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <FormikInput {...rest} />;
    case 'textarea':
      return <FormikTextarea {...rest} />;
    case 'select':
      return <FormikSelect {...rest} />;
    case 'radio':
      return <FormikRadio {...rest} />;
    case 'checkbox':
      return <FormikCheckbox {...rest} />;
    case 'date':
    default:
      return null;
  }
  return <div></div>;
}

export default FormikControl;
