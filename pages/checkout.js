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
        <form>
          <div>Contact Information</div>
          <input placeholder="first name" type="text" required></input>
          <input placeholder="last name" type="text" required></input>
          <input placeholder="email" type="email" required></input>
          <div>Shipping</div>
          <input placeholder="Street" type="text" required></input>
          <input placeholder="City" type="text" required></input>
          <input placeholder="Country" type="text" required></input>
          <div>Billing</div>
          <input placeholder="Creditcard number" type="text" required></input>
        </form>
      </Layout>
    </div>
  );
}
