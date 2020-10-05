import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getCartFromCookies } from '../utils/cookies';
import nextCookies from 'next-cookies';

export default function checkout(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  if (cart.length > 0) {
    return (
      <div>
        <Head>
          <title>JAWA Merch - Checkout</title>
        </Head>
        <Layout cart={cart}>
          <h1>Checkout</h1>
          <img
            src="/bb8logo.png"
            alt="bb8"
            className={styles.checkoutimg}
          ></img>
          <form>
            <div>Contact Information</div>
            <div className={styles.inlineblock}>
              <label HTMLFor="First Name">First Name</label>
              <br />
              <input
                id="First Name"
                placeholder="Luke"
                type="text"
                required
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label HTMLFor="Last Name">Last Name</label>
              <br />
              <input
                id="Last Name"
                placeholder="Skywalker"
                type="text"
                required
              ></input>
            </div>
            <br />
            <div className={styles.inlineblock}>
              <label HTMLFor="E-mail">E-mail</label>
              <br />
              <input
                id="E-mail"
                placeholder="usetheforce@luke.com"
                type="email"
                required
              ></input>
            </div>
            <div>Shipping</div>
            <div className={styles.inlineblock}>
              <label HTMLFor="address">Address</label>
              <br />
              <input
                id="address"
                placeholder="Address"
                type="text"
                required
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label HTMLFor="ZIP Code">ZIP Code</label>
              <br />
              <input
                id="ZIP Code"
                placeholder="ZIP Code"
                type="text"
                required
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label HTMLFor="City">City</label>
              <br />
              <input id="City" placeholder="City" type="text" required></input>
            </div>
            <div className={styles.inlineblock}>
              <label HTMLFor="Country">Country</label>
              <br />
              <input
                id="Country"
                placeholder="Country"
                type="text"
                required
              ></input>
            </div>
            <div>Payment Details</div>
            <div className={styles.inlineblock}>
              <label HTMLFor="CreditCardNumber">Credit Card</label>
              <br />
              <input
                id="CreditCardNumber"
                placeholder="Card Number"
                type="text"
                required
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label HTMLFor="ExpiryDate">Expiry Date</label>
              <br />
              <input
                id="ExpiryDate"
                placeholder="YY/MM"
                type="text"
                required
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label HTMLFor="CVV">CVV No.</label>
              <br />
              <input id="CVV" placeholder="CVV" type="text" required></input>
            </div>
            <br />
            <input type="submit" value="Complete Purchase"></input>
          </form>
        </Layout>
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>JAWA Merch - Checkout</title>
        </Head>
        <Layout cart={cart}>
          <h1>Checkout</h1>
          <h1>Your Cart is empty</h1>
          <Link href={'/'}>
            <div className={styles.checkoutbutton}>Back to Store</div>
          </Link>
        </Layout>
      </>
    );
  }
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
