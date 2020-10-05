import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { products } from '../../utils/database';
import AddToCart from '../../components/AddToCart';
import nextCookies from 'next-cookies';

export default function Products(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  const [allProducts, setAllProducts] = useState(products);
  const [sort, setSort] = useState('none');
  const [search, setSearch] = useState(' ');
  const [value, setValue] = useState('');

  function handleSortChange(e) {
    e.preventDefault();
    setValue(e.currentTarget.value);
    setSort(e.currentTarget.value);
    console.log(e.currentTarget.value);
    const val = e.currentTarget.value;
    setAllProducts(() => sortProducts(allProducts, val));
  }

  function sortProducts(all, sortParam) {
    const copyAll = [...all];
    if (sortParam === 'none') return products;
    if (sortParam === 'asc')
      return copyAll.sort((a, b) => {
        return a.price - b.price;
      });
    if (sortParam === 'des')
      return copyAll.sort((a, b) => {
        return b.price - a.price;
      });
    if (sortParam === 'abc')
      return copyAll.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  function handleSearchChange(e) {
    setSearch(value);
    console.log(search);
  }

  function searchProducts(all, searchParam) {
    //filter does not mutate
    const searchedProducts = all.filter((product) =>
      product.description.includes(searchParam),
    );
    return searchedProducts;
  }

  return (
    <>
      <Head>
        <title>JAWA Merch - Shop</title>
      </Head>
      <Layout cart={cart}>
        <h1>Shop</h1>
        <div className={styles.shop}>
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            onChange={(e) => {
              handleSortChange(e);
            }}
            defaultValue={value}
          >
            <option value={'none'}>no sort</option>
            <option value={'asc'}>Price, ascending</option>
            <option value={'des'}>Price, descending</option>
            <option value={'abc'}>alphabetical</option>
          </select>
          <label htmlFor="filter">Search: </label>
          <input
            id="filter"
            type="text"
            placeholder="search by keyword, for example 'medical'"
          ></input>
          <div className={styles.flexcontainer}>
            <div>
              {allProducts.map((product) => {
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
                    <AddToCart id={product.id} setCart={setCart} />
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

export function getServerSideProps(context) {
  const allCookies = nextCookies(context);
  const cartFromCookies = allCookies.cart || [];
  console.log(cartFromCookies);
  return {
    props: {
      cartFromCookies: cartFromCookies,
    },
  };
}
