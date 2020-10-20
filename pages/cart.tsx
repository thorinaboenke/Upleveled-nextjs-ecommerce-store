import { useState } from 'react';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import nextCookies from 'next-cookies';
import { Cart } from '../components/Cart';
import { ProductCart, ProductInCart, MergedProduct } from '../utils/types';
import { GetServerSidePropsContext } from 'next';

type CartProps = {
  cartFromCookies: ProductCart;
  mergedCart: MergedProduct[];
};
export default function CartPage(props: CartProps) {
  const [shoppingcart, setShoppingcart] = useState(props.mergedCart);

  return (
    <div>
      <Head>
        <title>JAWA Merch - Shopping Cart</title>
      </Head>
      <Layout cart={shoppingcart}>
        <h1>Shopping Cart</h1>
        <Cart cart={shoppingcart} setCart={setShoppingcart} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getProductsByIds } = await import('../utils/database');
  const allCookies = nextCookies(context);
  const cartFromCookies = (allCookies.cart as unknown) as ProductInCart[];

  const idsToFetch = cartFromCookies.map((item) => item.id);
  const productsByIds = await getProductsByIds(idsToFetch);
  const mergedCart: MergedProduct[] = [];
  // merge cart from cookies and price from ProductsByIds
  for (let i = 0; i < productsByIds.length; i++) {
    const test = cartFromCookies.find(
      (itemInCart: any) => itemInCart.id === productsByIds[i].id,
    );
    if (test) {
      mergedCart.push({
        ...productsByIds[i],
        ...test,
      });
    }
  }

  return {
    props: {
      cartFromCookies: cartFromCookies,
      mergedCart: mergedCart,
    },
  };
}
