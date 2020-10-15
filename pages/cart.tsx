import { useState } from 'react';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import nextCookies from 'next-cookies';
import Cart from '../components/Cart';
import { ProductCart, ProductList } from '../utils/types';
import { GetServerSidePropsContext } from 'next';

type CartProps = {
  cartFromCookies: ProductCart;
  products: ProductList;
};
export default function cart(props: CartProps) {
  const [shoppingcart, setShoppingcart] = useState(props.cartFromCookies);
  const products = props.products;

  return (
    <div>
      <Head>
        <title>JAWA Merch - Shopping Cart</title>
      </Head>
      <Layout cart={shoppingcart}>
        <h1>Shopping Cart</h1>
        <Cart
          cart={shoppingcart}
          setCart={setShoppingcart}
          databaseproducts={products}
        />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
