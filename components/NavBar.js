import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { calculateTotalItemsInCart } from '../utils/cookies';
import { getCartFromCookies } from '../utils/cookies';

export default function NavBar({ cart }) {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <a>
          <img src={'/logo.jpg'} alt="jawa-logo" className={styles.logo}></img>{' '}
          <div className={styles.shopname}>
          JAWA Merch
          </div>
        </a>
      </Link>
      <div className={styles.links}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="/cart">
        <a>
          <div aria-label="total items in cart">
            {`    ` + calculateTotalItemsInCart(cart)}
          </div>
          <img src="/cart.svg" alt="cart" height="20px"></img>
        </a>
      </Link>

      <Link href="/checkout">
        <a>Checkout</a>
      </Link>
      </div>
    </div>
  );
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
