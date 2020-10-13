import Footer from './Footer';
import Header from './Header';
import NavBar from './NavBar';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Layout({ children, cart }) {
  // <Footer></Footer>
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bodyflexbox}>
        <Header cart={cart}></Header>
        <main className={styles.main}>{children}</main>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
