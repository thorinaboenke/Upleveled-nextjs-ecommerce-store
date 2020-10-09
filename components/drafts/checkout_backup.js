import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../Layout';
import { getCartFromCookies } from '../../utils/cookies';
import nextCookies from 'next-cookies';

export default function checkout(props) {
  const [cart, setCart] = useState(props.cartFromCookies);
  const [checkoutInfo, setCheckoutInfo] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckoutInfo({ [e.target.name]: e.target.value });
    console.log(checkoutInfo);
  };
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>Contact Information</div>
            <div className={styles.inlineblock}>
              <label htmlFor="First Name">First Name</label>
              <br />
              <input
                name="First Name"
                id="First Name"
                placeholder="Luke"
                type="text"
                value={firstname}
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label htmlFor="lastname">Last Name</label>
              <br />
              <input
                name="lastname"
                id="lastname"
                placeholder="Skywalker"
                type="text"
              ></input>
            </div>
            <br />
            <div className={styles.inlineblock}>
              <label htmlFor="email">E-mail</label>
              <br />
              <input
                name="email"
                id="email"
                placeholder="usetheforce@luke.com"
                type="email"
              ></input>
            </div>
            <div>Shipping</div>
            <div className={styles.inlineblock}>
              <label htmlFor="address">Address</label>
              <br />
              <input
                name="address"
                id="address"
                placeholder="Address"
                type="text"
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label htmlFor="zipcode">ZIP Code</label>
              <br />
              <input
                name="zipcode"
                id="zipcode"
                placeholder="ZIP Code"
                type="text"
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label htmlFor="city">City</label>
              <br />
              <input
                name="city"
                id="city"
                placeholder="City"
                type="text"
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label htmlFor="country">Country</label>
              <br />
              <input
                name="country"
                id="country"
                placeholder="Country"
                type="text"
              ></input>
            </div>
            <div>Payment Details</div>
            <div className={styles.inlineblock}>
              <label htmlFor="CreditCardNumber">Credit Card</label>
              <br />
              <input
                name="creditCardNumber"
                id="creditCardNumber"
                placeholder="Card Number"
                type="text"
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label htmlFor="expiryDate">Expiry Date</label>
              <br />
              <input
                name="expiryDate"
                id="expiryDate"
                placeholder="YY/MM"
                type="text"
              ></input>
            </div>
            <div className={styles.inlineblock}>
              <label htmlFor="cvv">CVV No.</label>
              <br />
              <input name="cvv" id="cvv" placeholder="CVV" type="text"></input>
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
