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
          <img src={'/logo.jpg'} alt="logo" className={styles.logo}></img> JAWA
          Merch
        </a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="/cart">
        <a>Cart</a>
      </Link>
      <span>{calculateTotalItemsInCart(cart)}</span>
      <img src="/cart.svg" alt="cart" height="20px"></img>

      <Link href="/checkout">
        <a>Checkout</a>
      </Link>
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
