import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { products } from '../../utils/database';
import Layout from '../../components/Layout';
import AddToCart from '../../components/AddToCart';
import nextCookies from 'next-cookies';
// cart data structure
//[{id: '1', amount : 0},{id: '1', amount : 0}]

export default function Product(props) {
  const [cart, setCart] = useState([]);
  //

  const product = products.find((currentProduct) => {
    if (currentProduct.id === props.id) {
      return true;
    } else return false;
  });

  return (
    <Layout>
      <div>
        {product.name}
        <br />
        {product.description}
        <br />
        {product.price} credits
        <br />
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
