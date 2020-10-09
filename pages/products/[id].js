import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Layout from '../../components/Layout';
import AddToCart from '../../components/AddToCart';
import nextCookies from 'next-cookies';
import Link from 'next/link';
// cart data structure
//[{id: '1', amount : 0},{id: '1', amount : 0}]

export default function Product(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  const products = props.products;
  //make array with all the avaiable product ids
  const allProductIds = products.map((product) => product.id);

  function getPrev(id, allProductIds) {
    if (id === '1') {
      return '' + allProductIds.length;
    }
    const next = parseInt(id) - 1;
    return '' + next;
  }

  function getNext(id, allProductIds) {
    if (parseInt(id) === allProductIds.length) {
      return 1 + '';
    } else {
      return parseInt(id) + 1 + '';
    }
  }

  const next = getNext(props.index, allProductIds);
  const prev = getPrev(props.index, allProductIds);

  const product = props.product;

  if (!props.product) {
    return (
      <Layout cart={cart}>
        <div className={styles.singleproductcontainer}>
          <div className={styles.producttitle}>
            Sorry, this droid does not seem to exist
          </div>
        </div>
        <Link href={'/'}>
          <div className={styles.checkoutbutton}>Back to Store</div>
        </Link>
      </Layout>
    );
  }
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
          <img src={product.url} alt=""></img>
        </div>
        <div className={styles.producttitle}>{product.name}</div>
        <div className={styles.productdescription}>{product.description}</div>
        <div className={styles.price}>{product.price} Credits</div>
        <AddToCart id={product.id} setCart={setCart} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getProductById } = await import('../../utils/database.js');
  const { getProducts } = await import('../../utils/database.js');
  const products = await getProducts();
  const allProductIds = products.map((product) => product.id);
  const product = await getProductById(allProductIds[context.query.id - 1]);

  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  const props = {};
  props.index = context.query.id;
  props.products = products;
  props.cartFromCookies = cartFromCookies;
  if (product) props.product = product;

  return {
    props: props,
  };
}
