import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jawa Merch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.landing}>
          <h1 className={styles.heading}>
            We have the droids you're looking for!
          </h1>
          <Link href="/products">
            <a className={styles.checkoutbutton}>All products</a>
          </Link>
          <div className={styles.section1}>
            <h2>
              High quality second hand droids - Everything from astromech,
              protocol, maintenance to construction, medical, scouts, mining,
              security and pre-clone war military grade antiques
            </h2>
          </div>
          <div className={styles.section2}>
            <h2>Branches in Mos Eisley, Mos Espa and Freetown</h2>
          </div>
          <div className={styles.section3}>
            <h2>
              Shipping to the whole galaxy, including all outer rim territories
            </h2>
          </div>
        </div>
      </Layout>
    </>
  );
}
