import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Footer() {

  return (<footer>
    <div className={styles.upper}>
      <div className={styles.about}>
      <Link href='/'>
      <a>About Us</a>
      </Link>
      <Link href='/'>
      <a>FAQ</a>
      </Link>
      <Link href='/'>
      <a>Contact</a>
      </Link>
      <Link href='/'>
      <a>Jobs</a>
      </Link>
      </div>
      <div> <a href='/'>
      <img className={styles.socialmedia} src='/twitter.svg' alt='twitter icon'></img>
      </a>
      <a href='/'>
      <img className={styles.socialmedia} src='/github.svg' alt='github icon'></img>
      </a>
      <a href='/'>
      <img className={styles.socialmedia} src='/whatsapp.svg' alt='whatsapp icon'></img>
      </a>
      <a href='/'>
      <img className={styles.socialmedia} src='/instagram.svg' alt='instagram icon'></img>
      </a>
      <a href='/'>
      <img className={styles.socialmedia} src='/facebook.svg' alt='facebook icon'></img>
      </a>
      </div>
    </div>
   
    <div className={styles.lower}>
  
  <div className={styles.terms}>
  <div>© JAWA {new Date().getFullYear()}</div>
  <Link href='/'>
      <div>Terms & Conditions</div>
      </Link>
      <Link href='/'>
      <div>Privacy</div>
      </Link>
      </div>
    </div>
  </footer>);
}
