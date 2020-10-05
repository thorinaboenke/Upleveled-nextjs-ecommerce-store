import Link from 'next/link';
import NavBar from './NavBar';
import styles from '../styles/Home.module.css';

export default function Header({ cart }) {
  return (
    <>
      <div className={styles.header}>
        <NavBar cart={cart}></NavBar>
      </div>
    </>
  );
}
