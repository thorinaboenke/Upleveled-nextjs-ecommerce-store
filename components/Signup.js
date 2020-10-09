import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './formik/FormikControl';

export default function Signup() {
  const newsletterOptions = [
    { key: 'Sign me up to the Newsletter', value: 'subscribe' },
  ];
  const inititalValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Must have min. 8 characters.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match.')
      .required('Required'),
  });
  const onSubmit = (values) => console.log('Form data', values);
  return (
    <div className="form-container">
      <h1>Signup</h1>
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div>
              <FormikControl
                control="input"
                type="text"
                label="Name"
                name="username"
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="password"
                label="Confirm password"
                name="confirmPassword"
              />
            </div>
            <div className="button-control">
              <button
                className="signup-button"
                type="submit"
                disabled={!formik.isValid}
              >
                Create Account
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
