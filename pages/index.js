import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jawa Merch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Amazing E commerce Store</h1>
        <Link href="/products">
          <a>Find your droids here</a>
        </Link>
      </Layout>
    </div>
  );
}
