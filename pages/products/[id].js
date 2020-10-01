import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { products } from '../../utils/database';
import Layout from '../../components/Layout';
import AddToCart from '../../components/AddToCart';
import nextCookies from 'next-cookies';
import Link from 'next/link';
// cart data structure
//[{id: '1', amount : 0},{id: '1', amount : 0}]

export default function Product(props) {
  // const [cart, setCart] = useState([]);

  function getNext(id, products) {
    if (id === '1') {
      return '' + products.length;
    }
    const next = parseInt(id) - 1;
    return '' + next;
  }

  function getPrev(id, products) {
    if (id == products.length) {
      return 1 + '';
    } else {
      return parseInt(id) + 1 + '';
    }
  }
  const next = getNext(props.id, products);
  const prev = getPrev(props.id, products);

  console.log(typeof next, next);
  console.log(typeof prev, prev);

  const product = products.find((currentProduct) => {
    if (currentProduct.id === props.id) {
      return true;
    } else return false;
  });

  return (
    <Layout>
      <Link href={`/products/${prev}`}>
        <div className={styles.pageleft}></div>
      </Link>
      <Link href={`/products/${next}`}>
        <div className={styles.pageright}></div>
      </Link>
      <div className={styles.singleproductcontainer}>
        <div className={styles.imagecontainer}>
          <img src={product.imgUrl} alt=""></img>
        </div>
        <div className={styles.producttitle}>{product.name}</div>
        <div className={styles.productdescription}>{product.description}</div>
        <div className={styles.price}>{product.price} Credits</div>
        <AddToCart id={product.id} />
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { id: context.query.id },
  };
}
