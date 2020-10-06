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
  const [cart, setCart] = useState(props.cartFromCookies);

  function getPrev(id, prod) {
    if (id === '1') {
      return '' + prod.length;
    }
    const next = parseInt(id) - 1;
    return '' + next;
  }

  function getNext(id, prod) {
    if (parseInt(id) === prod.length) {
      return 1 + '';
    } else {
      return parseInt(id) + 1 + '';
    }
  }
  const next = getNext(props.id, products);
  const prev = getPrev(props.id, products);

  const product = products.find((currentProduct) => {
    if (currentProduct.id === props.id) {
      return true;
    } else return false;
  });

  return (
    <Layout cart={cart}>
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
        <AddToCart id={product.id} setCart={setCart} />
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  console.log(cartFromCookies);
  return {
    props: { id: context.query.id, cartFromCookies: cartFromCookies },
  };
}
