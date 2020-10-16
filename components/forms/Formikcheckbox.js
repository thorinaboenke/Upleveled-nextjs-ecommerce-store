import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function FormikCheckbox(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div classname="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="radio" name={name} id={name} {...rest}>
        {({ field }) => {
          options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default FormikCheckbox;
