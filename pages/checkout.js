import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';
import FormikCheckout from '../components/FormikCheckout';
import { getCartFromCookies } from '../utils/cookies';
import nextCookies from 'next-cookies';
import * as Yup from 'yup';

import {
  Formik,
  Field,
  Form,
  useField,
  FieldArray,
  ErrorMessage,
} from 'formik';

export default function checkout(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  const [checkoutInfo, setCheckoutInfo] = useState({});

  if (cart.length > 0) {
    return (
      <div>
        <Head>
          <title>JAWA Merch - Checkout</title>
        </Head>
        <Layout cart={cart}>
          <h1>Checkout</h1>
          <img
            src="/bb8logo.png"
            alt="bb8"
            className={styles.checkoutimg}
          ></img>
          <FormikCheckout />
        </Layout>
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>JAWA Merch - Checkout</title>
        </Head>
        <Layout cart={cart}>
          <h1>Checkout</h1>
          <h1>Your Cart is empty</h1>
          <Link href={'/'}>
            <div className={styles.checkoutbutton}>Back to Store</div>
          </Link>
        </Layout>
      </>
    );
  }
}

export function getServerSideProps(context) {
  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  console.log(cartFromCookies);
  return {
    props: {
      cartFromCookies: cartFromCookies,
    },
  };
}
