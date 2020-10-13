import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { calculateTotalItemsInCart } from '../utils/cookies.tsx';
import { removeItemFromCartInCookie } from '../utils/cookies.tsx';
import { updateAmountInCartInCookie } from '../utils/cookies.tsx';
import { getCartFromCookies } from '../utils/cookies.tsx';

export default function Cart({ cart, setCart, databaseproducts }) {
  const shippingFee = 49;
  const minOrderValue = 499;
  const products = databaseproducts;

  function calculateTotal(cartForTotal) {
    const total = cartForTotal.reduce((acc, curr) => {
      return (
        acc +
        curr.amount * products.find((product) => product.id === curr.id).price
      );
    }, 0);
    return total;
  }

  function calculateTotalwithShipping(amount, minOrderValue, shippingFee) {
    if (amount < minOrderValue) {
      return amount + shippingFee;
    } else {
      return amount;
    }
  }
  if (cart.length > 0) {
    return (
      <div className={styles.cart}>
        <div className={styles.price}>price</div>
        <div className={styles.allitemcsontainer}>
          {cart.map((item) => {
            return (
              <div className={styles.itemcontainer} key={item.id}>
                <div className={styles.imagecontainer}>
                  <img
                    alt=""
                    src={
                      products.filter(
                        (product) => product.id === parseInt(item.id),
                      )[0].url
                    }
                    style={{ height: '100px' }}
                  />
                </div>
                <div className={styles.nameandquant}>
                  <div className={styles.name}>
                    {
                      products.find(
                        (product) => product.id === parseInt(item.id),
                      ).name
                    }
                  </div>

                  <div className={styles.quant}>
                    Quantity:{' '}
                    <input
                      type="number"
                      min="1"
                      value={item.amount}
                      onChange={(e) => {
                        updateAmountInCartInCookie(item.id, e.target.value);
                        setCart(getCartFromCookies());
                      }}
                    ></input>
                    <button
                      className={styles.removebutton}
                      onClick={() => {
                        removeItemFromCartInCookie(item.id);
                        setCart(getCartFromCookies());
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.placeholder}></div>
                <div className={styles.priceandsubtotal}>
                  <div>
                    {
                      products.find(
                        (product) => product.id === parseInt(item.id),
                      ).price
                    }
                  </div>
                  <div className={styles.subtotal}>
                    Subtotal:{' '}
                    {item.amount *
                      parseInt(
                        products.find((product) => product.id === item.id)
                          .price,
                      )}
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <div className={styles.subtotal}>
              Shipping Fees:{' '}
              {calculateTotal(cart) > minOrderValue ? 0 : shippingFee}
            </div>
          </div>
          <div>
            <div className={styles.total}>
              Total:{' '}
              {calculateTotalwithShipping(
                calculateTotal(cart),
                minOrderValue,
                shippingFee,
              )}
            </div>
          </div>
        </div>
        <div className={styles.cartsummary}>
          <div>Items: {calculateTotalItemsInCart(cart)}</div>
          <Link href="./checkout">
            <button className="checkoutbutton">Go to Checkout</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h2>Your Cart is empty</h2>
        <Link href={'/'}>
          <button className="checkoutbutton">Back to Store</button>
        </Link>
      </>
    );
  }
}
