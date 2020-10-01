import Footer from './Footer';
import Header from './Header';
import NavBar from './NavBar';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Layout(props) {
  // <Footer></Footer>
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>{props.children}</main>
    </>
  );
}
