import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { products } from '../../utils/database';
import AddToCart from '../../components/AddToCart';

export default function Products() {
  return (
    <>
      <Head>
        <title>JAWA Merch - Shop</title>
      </Head>
      <Layout>
        <h1>Shop</h1>
        <div className={styles.shop}>
          <div className={styles.flexcontainer}>
            <div>
              {products.map((product) => {
                return (
                  <div key={product.id} className={styles.productcard}>
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <img src={product.imgUrl} alt=""></img>
                      </Link>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <a className={styles.name}>{product.name}</a>
                    </Link>{' '}
                    <div className={styles.description}>
                      {product.description}
                    </div>
                    <div className={styles.price}>{product.price} credits</div>
                    <AddToCart id={product.id} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
