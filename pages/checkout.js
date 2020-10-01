import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function checkout() {
  return (
    <div>
      <Head>
        <title>JAWA Merch - Checkout</title>
      </Head>
      <Layout>
        <h1>Checkout</h1>
      </Layout>
    </div>
  );
}
