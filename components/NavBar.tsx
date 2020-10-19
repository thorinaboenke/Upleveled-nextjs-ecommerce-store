import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { calculateTotalItemsInCart } from '../utils/cookies';
import { ProductCart } from '../utils/types';

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
          <a data-cy="header-link-home">Home</a>
        </Link>
        <Link href="/products">
          <a data-cy="header-link-products">Products</a>
        </Link>
        <Link href="/cart">
          <a data-cy="header-link-cart">
            <div data-cy="header-items-in-cart" aria-label="total items in cart">
              {`    ` + calculateTotalItemsInCart(props.cart)}
            </div>
            <img src="/cart.svg" alt="cart" height="20px" />
          </a>
        </Link>

        <Link href="/checkout">
          <a data-cy="header-link-checkout">Checkout</a>
        </Link>
      </div>
    </div>
  );
}
