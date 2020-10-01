import Link from 'next/link';
import NavBar from './NavBar';
import styles from '../styles/Home.module.css';

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <NavBar></NavBar>
      </div>
    </>
  );
}
