import Footer from './Footer.tsx';
import Header from './Header.tsx';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { ProductCart } from '../utils/types';
import { FunctionComponent } from 'react';

type LayoutProps = {
  cart: ProductCart;
};

export const Layout: FunctionComponent<LayoutProps> = ({ children, cart }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bodyflexbox}>
        <Header cart={cart} />
        <main className={styles.main}>{children}</main>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};
