import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';
import Checkout from '../components/Checkout';
import nextCookies from 'next-cookies';
import { calculateTotalItemsInCart } from '../utils/cookies.tsx';

export default function checkout(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const products = props.products;

  const shippingFee = 49;
  const minOrderValue = 499;

  function calculateTotal(cartForTotal) {
    const total = cartForTotal.reduce((acc, curr) => {
      return (
        acc +
        curr.amount * products.find((product) => product.id === curr.id).price
      );
    }, 0);
    return total;
  }

  function calculateTotalwithShipping(amount, minOrderValue, shippingFee) {
    if (amount < minOrderValue) {
      return amount + shippingFee;
    } else {
      return amount;
    }
  }

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
          <div>Your cart: {calculateTotalItemsInCart(cart)} items</div>{' '}
          <div>
            Total Amount to pay:{' '}
            {calculateTotalwithShipping(
              calculateTotal(cart),
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

export async function getServerSideProps(context) {
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
