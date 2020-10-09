import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

export default function FormikContainer() {
  const paymentOptions = [
    {
      key: 'Select an option',
      value: '',
    },
    {
      key: 'visa',
      value: 'VISA',
    },
    {
      key: 'master',
      value: 'MASTER',
    },
    {},
  ];
  const inititalValues = {
    email: '',
    description: '',
    paymentMethod: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    paymentMethod: Yup.string().required('Required'),
  });
  const onSubmit = (values) => console.log('Form data', values);
  return (
    <div>
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="textarea"
              label="Description"
              name="description"
            />
            <FormikControl
              control="select"
              label="Payment method"
              name="paymentMethod"
              options={paymentOptions}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
