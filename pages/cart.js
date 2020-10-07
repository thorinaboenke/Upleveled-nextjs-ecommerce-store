import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import Cart from '../components/Cart';
import { getCartFromCookies } from '../utils/cookies';

export default function cart(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(props.cartFromCookies);
  const products = props.products;

  return (
    <div>
      <Head>
        <title>JAWA Merch - Shopping Cart</title>
      </Head>
      <Layout cart={cart}>
        <h1>Shopping Cart</h1>
        <Cart cart={cart} setCart={setCart} databaseproducts={products} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getProducts } = await import('../utils/database');
  const products = await getProducts();
  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  console.log(cartFromCookies);
  console.log(products);
  return {
    props: {
      cartFromCookies: cartFromCookies,
      products: products,
    },
  };
}
