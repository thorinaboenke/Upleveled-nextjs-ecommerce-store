import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function NavBar() {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <a>
          <img src={'/logo.jpg'} alt="logo" className={styles.logo}></img> JAWA
          Merch
        </a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="/cart">
        <a>Cart</a>
      </Link>
      <Link href="/checkout">
        <a>Checkout</a>
      </Link>
    </div>
  );
}
