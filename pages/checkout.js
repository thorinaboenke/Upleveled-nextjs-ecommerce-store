import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';
import Checkout from '../components/Checkout';
import nextCookies from 'next-cookies';

export default function checkout(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  const [checkoutInfo, setCheckoutInfo] = useState({});

  if (cart.length > 0) {
    return (
      <>
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
          <div className="checkform">
            <Checkout />
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>JAWA Merch - Checkout</title>
        </Head>
        <Layout cart={cart}>
          <h1>Checkout</h1>
          <h2>Your Cart is empty</h2>
          <Link href={'/'}>
            <button className="checkoutbutton">Back to Store</button>
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
