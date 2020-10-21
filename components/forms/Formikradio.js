import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Formikradio(props) {
  const { label, name, options, ...rest } = props;
  return (
    <>
      <div className="form-control">
        <label>{label}</label>
        <div className="radio-choice-outer-wrapper">
          <Field name={name} {...rest}>
            {({ field }) => {
              return options.map((option) => {
                return (
                  <React.Fragment key={option.key}>
                    <div class="radio-choice">
                      <label htmlFor={option.value}>{option.key}</label>
                      <input
                        type="radio"
                        id={option.value}
                        {...field}
                        {...rest}
                        value={option.value}
                      />
                    </div>
                  </React.Fragment>
                );
              });
            }}
          </Field>
        </div>
      </div>
      <ErrorMessage component={TextError} name={name} />
    </>
  );
}

export default Formikradio;
