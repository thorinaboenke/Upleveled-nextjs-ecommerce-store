import styles from '../styles/Home.module.css';
import * as Yup from 'yup';
import FormikControl from './formik/FormikControl';

import { Formik, Form, useField } from 'formik';

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// const MyTextField = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div className={styles.inlineblock}>
//       <label>{label}</label>
//       <br />
//       <input {...field} {...props} />

//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//       <br />
//     </div>
//   );
// };

const FormikCheckout = () => (
  <div>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        acceptedTerms: false,
        address: '',
        zipCode: '',
        city: '',
        country: '',
        creditCardNumber: '',
        expiryDate: '',
        cvv: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(40, 'Must be 40 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(40, 'Must be 40 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        acceptedTerms: Yup.boolean()
          .required('Required')
          .oneOf([true], 'You must accept the terms and conditions.'),
        address: Yup.string().required('Required'),
        zipCode: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        creditCardNumber: Yup.string().required('Required'),
        expiryDate: Yup.string().required('Required'),
        cvv: Yup.string()
          .max(3, 'Must be exactly 3 numbers')
          .min(3, 'Must be exactly 3 numbers')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={styles.checkoutHeading}>Contact Information</div>
          <div className={styles.checkoutSection}>
            <FormikControl
              control="input"
              type="text"
              name="firstName"
              placeholder="Luke"
              label="First Name"
            />

            <FormikControl
              control="input"
              type="text"
              name="lastName"
              placeholder="Skywalker"
              label="Last Name"
            />

            <FormikControl
              control="input"
              type="email"
              name="email"
              placeholder="usetheforce@luke.com"
              label="Email"
            />
          </div>
          <div className={styles.checkoutHeading}>Shipping</div>
          <div className={styles.checkoutSection}>
            <FormikControl
              control="input"
              type="text"
              name="address"
              placeholder="Address"
              label="Address"
            />
            <FormikControl
              control="input"
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              label="ZIP Code"
            />
            <FormikControl
              control="input"
              type="text"
              name="city"
              placeholder="City"
              label="City"
            />
            <FormikControl
              control="input"
              type="text"
              name="country"
              placeholder="Country"
              label="Country"
            />
          </div>
          <div className={styles.checkoutHeading}>Payment Details</div>
          <div className={styles.checkoutSection}>
            <FormikControl
              control="input"
              type="text"
              name="creditCardNumber"
              placeholder=""
              label="Card No."
            />
            <FormikControl
              control="input"
              type="text"
              name="expiryDate"
              placeholder="YY/MM"
              label="Expiry Date"
            />
            <FormikControl
              control="input"
              type="text"
              name="cvv"
              placeholder="CVV"
              label="CVV No."
            />
          </div>
          <div className={styles.acceptterms}>
            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>
          </div>
          <div className="button-control">
            <button
              className="purchasebutton"
              type="submit"
              disabled={isSubmitting}
            >
              Complete Purchase
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormikCheckout;
