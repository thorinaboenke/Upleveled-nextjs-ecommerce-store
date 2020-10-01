import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import Cart from '../components/Cart';

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
        <Cart cart={cart} />

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

{
  /* <p>
ID: {cart[0]?.id} Amount: {cart[0]?.amount}
</p>
<p>
ID: {cart[1]?.id} Amount: {cart[1]?.amount}
</p> */
}
