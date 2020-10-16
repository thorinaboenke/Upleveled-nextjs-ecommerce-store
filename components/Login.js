import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './forms/FormikControl';
import Link from 'next/link';

export default function FormikSignup() {
  const inititalValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Must have min. 8 characters.'),
  });
  const onSubmit = (values) => console.log('Form data', values);
  return (
    <div className="form-container">
      <h1>Login</h1>
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
              control="input"
              type="password"
              label="Password"
              name="password"
            />
            <div className="button-control">
              <button
                className="login-button"
                type="submit"
                disabled={!formik.isValid}
              >
                Login
              </button>
              <div className="instructions">
                <div>
                  <Link href="/signup">
                    <a>Create an account</a>
                  </Link>
                </div>
                <div>
                  Request a{' '}
                  <Link href="/newpassword">
                    <a>new password</a>
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
