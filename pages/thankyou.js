import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function thankyou() {
  return (
    <div>
      <Head>
        <title>Thank you!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Thank you for your purchase</h1>
        <img src="/head.png" alt="jawa head"></img>
        <Link href="/products">
          <a className={styles.checkoutbutton}>Back to Store</a>
        </Link>
      </Layout>
    </div>
  );
}
