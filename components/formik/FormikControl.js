import React from 'react';
import FormikInput from './Formikinput';
import FormikTextarea from './Formiktextarea';
import FormikSelect from './Formikselect';
import FormikRadio from './Formikradio';
import FormikCheckbox from './Formikcheckbox';
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
}

export default FormikControl;
