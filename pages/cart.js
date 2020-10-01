import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';

export default function cart(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(props.cartFromCookies);
  //here do the magi to initialize the cart
  return (
    <div>
      <Head>
        <title>JAWA Merch - Shopping Cart</title>
      </Head>
      <Layout>
        <h1>Shopping Cart</h1>
        <p>{cart[0].id}</p>
        <Link href="./checkout">
          <a>Go to Checkout</a>
        </Link>
      </Layout>
    </div>
  );
}

export function getServerSideProps(context) {
  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  return {
    props: {
      cartFromCookies: cartFromCookies,
    },
  };
}
