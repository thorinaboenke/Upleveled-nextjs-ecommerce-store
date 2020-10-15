import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import Planets from '../components/Planets';
import styles from '../styles/Home.module.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import nextCookies from 'next-cookies';
import { ProductCart } from '../utils/types';
import { GetServerSidePropsContext } from 'next';

const planetClient = new ApolloClient({
  uri: 'https://my-starwars-api.herokuapp.com/',
  cache: new InMemoryCache(),
});

type HomeProps = {
  cartFromCookies: ProductCart;
};

export default function Home(props: HomeProps) {
  const [cart] = useState(props.cartFromCookies);
  return (
    <>
      <Head>
        <title>Jawa Merch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout cart={cart}>
        <div className={styles.landing}>
          <h1 className={styles.heading}>
            We have the droids you're looking for!
          </h1>
          <img className={styles.peek} src="/peek.png" alt=""></img>
          <div className={styles.section1}>
            <h3>High quality second hand droids</h3>
            <h2>
              Everything from astromech, protocol, maintenance to construction,
              medical, scouts, mining, security and pre-clone war military grade
              antiques
            </h2>
            <Link href="/products">
              <button className="checkoutbutton">All products</button>
            </Link>
          </div>
          <div className={styles.section2}>
            <h2>Branches in Mos Eisley, Mos Espa and Freetown</h2>
          </div>
          <div className={styles.section3}>
            <h2>Shipping to the whole galaxy</h2>
            <ApolloProvider client={planetClient}>
              <Planets />
            </ApolloProvider>
          </div>
        </div>
      </Layout>
    </>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  console.log(cartFromCookies);
  return {
    props: {
      cartFromCookies: cartFromCookies,
    },
  };
}
