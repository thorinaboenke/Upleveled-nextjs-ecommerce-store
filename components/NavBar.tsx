import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { calculateTotalItemsInCart } from '../utils/cookies';

type NavBarProps = {
  cart: ProductCart;
};

export default function NavBar(props: NavBarProps) {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <a>
          <img src={'/logo.jpg'} alt="jawa-logo" className={styles.logo} />{' '}
          <div className={styles.shopname}>JAWA Merch</div>
        </a>
      </Link>
      <div className={styles.links}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/products">
          <a>Products</a>
        </Link>
        <Link href="/cart">
          <a>
            <div aria-label="total items in cart">
              {`    ` + calculateTotalItemsInCart(props.cart)}
            </div>
            <img src="/cart.svg" alt="cart" height="20px" />
          </a>
        </Link>

        <Link href="/checkout">
          <a>Checkout</a>
        </Link>
      </div>
    </div>
  );
}
