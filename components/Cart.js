import { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { products } from '../utils/database';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { calculateTotalItemsInCart } from '../utils/cookies';
import { addAmountToCartInCookie } from '../utils/cookies';
import { removeItemFromCartInCookie } from '../utils/cookies';
import { updateAmountInCartInCookie } from '../utils/cookies';
import { getCartFromCookies } from '../utils/cookies';

export default function Cart({ cart, setCart }) {
  const shippingFee = 49;
  const minOrderValue = 499;

  function calculateTotal(cartForTotal) {
    const total = cartForTotal.reduce((acc, curr) => {
      return (
        acc +
        curr.amount *
          products.filter((product) => product.id === curr.id)[0].price
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
                      products.filter((product) => product.id === item.id)[0]
                        .imgUrl
                    }
                    style={{ height: '100px' }}
                  />
                </div>
                <div className={styles.nameandquant}>
                  <div className={styles.name}>
                    {
                      products.filter((product) => product.id === item.id)[0]
                        .name
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
                <div className={styles.priceandsubtotal}>
                  <div>
                    {
                      products.filter((product) => product.id === item.id)[0]
                        .price
                    }
                  </div>
                  <div className={styles.subtotal}>
                    Subtotal:{' '}
                    {item.amount *
                      parseInt(
                        products.filter((product) => product.id === item.id)[0]
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
            <a className={styles.checkoutbutton}>Go to Checkout</a>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div>Your Cart is empty</div>
        <Link href={'/'}>
          <div className={styles.checkoutbutton}>Back to Store</div>
        </Link>
      </>
    );
  }
}
