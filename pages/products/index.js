import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { products } from '../../utils/database';

export default function Products() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Droids Droids Droids</title>
      </Head>
      <Layout>
        <h1>Shop</h1>
        <h2>All products</h2>
        <ul>
          {products.map((droid) => {
            return (
              <li key={droid.id}>
                <Link href={`/products/${droid.id}`}>
                  <a>{droid.name}</a>
                </Link>{' '}
                {droid.description} {droid.price} credits
              </li>
            );
          })}
        </ul>
      </Layout>
    </div>
  );
}
