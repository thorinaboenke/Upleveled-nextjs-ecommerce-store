import React from 'react';
import Formikinput from './Formikinput';
import Formiktextarea from './Formiktextarea';
import Formikselect from './Formikselect';
import Formikradio from './Formikradio';
import Formikcheckbox from './Formikcheckbox';
// dicides which form fields have to be rendered based on one particular prop:
function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Formikinput {...rest} />;
    case 'textarea':
      return <Formiktextarea {...rest} />;
    case 'select':
      return <Formikselect {...rest} />;
    case 'radio':
      return <Formikradio {...rest} />;
    case 'checkbox':
      return <Formikcheckbox {...rest} />;
    case 'date':
    default:
      return null;
  }
}

export default FormikControl;
