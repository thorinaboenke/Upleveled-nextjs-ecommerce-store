import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { products } from '../../utils/database';
import AddToCart from '../../components/AddToCart';
import nextCookies from 'next-cookies';

export default function Products(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  return (
    <>
      <Head>
        <title>JAWA Merch - Shop</title>
      </Head>
      <Layout cart={cart}>
        <h1>Shop</h1>
        <div className={styles.shop}>
          <div className={styles.flexcontainer}>
            <div>
              {products.map((product) => {
                return (
                  <div key={product.id} className={styles.productcard}>
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <img src={product.imgUrl} alt=""></img>
                      </Link>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <a className={styles.name}>{product.name}</a>
                    </Link>{' '}
                    <div className={styles.description}>
                      {product.description}
                    </div>
                    <div className={styles.price}>{product.price} credits</div>
                    <AddToCart id={product.id} setCart={setCart} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
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
