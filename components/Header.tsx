import NavBar from './NavBar';
import styles from '../styles/Home.module.css';
import { ProductCart } from '../utils/types';

type HeaderProps = { cart: ProductCart };

export default function Header(props: HeaderProps) {
  return (
    <div className={styles.header}>
      <NavBar cart={props.cart} />
    </div>
  );
}
