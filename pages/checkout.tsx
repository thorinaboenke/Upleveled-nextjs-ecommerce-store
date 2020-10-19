import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import Checkout from '../components/Checkout';
import nextCookies from 'next-cookies';
import {
  calculateTotal,
  calculateTotalItemsInCart,
  calculateTotalwithShipping,
} from '../utils/cookies';
import { ProductCart, ProductList } from '../utils/types';
import { GetServerSidePropsContext } from 'next';

type CheckoutProps = {
  cartFromCookies: ProductCart;
  products: ProductList;
};

export default function CheckoutPage(props: CheckoutProps) {
  const [cart] = useState(props.cartFromCookies || []);
  const products = props.products || [];

  const shippingFee = 49;
  const minOrderValue = 499;

  if (cart.length > 0) {
    return (
      <>
        <Head>
          <title>JAWA Merch - Checkout</title>
        </Head>
        <Layout cart={cart}>
          <h1 data-cy="checkout-heading">Checkout</h1>
          <img src="/bb8logo.png" alt="bb8" className={styles.checkoutimg} />
          <div>Items in your cart: {calculateTotalItemsInCart(cart)}</div>{' '}
          <div>
            Total Amount to pay:{' '}
            {calculateTotalwithShipping(
              calculateTotal(cart, products),
              minOrderValue,
              shippingFee,
            )}{' '}
            credits
          </div>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getProducts } = await import('../utils/database');
  const products = await getProducts();
  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  console.log(cartFromCookies);
  return {
    props: {
      cartFromCookies: cartFromCookies,
      products: products,
    },
  };
}
