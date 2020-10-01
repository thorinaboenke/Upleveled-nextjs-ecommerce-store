import { useState } from 'react';
import cart from '../pages/cart';
import { products } from '../utils/database';
import styles from '../styles/Home.module.css';
import { addAmountToCartInCookie } from '../utils/cookies';
import Link from 'next/link';
import { calculateTotalItemsInCart } from '../utils/cookies';

export default function Cart({ cart }) {
  const shippingFee = 49;
  const minOrderValue = 499;
  console.log(products);
  console.log(cart);
  function calculateTotal(cart) {
    const total = cart.reduce((acc, curr) => {
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
                  <div className={styles.quant}>Quantity: {item.amount}</div>
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
        <div>Items in Cart: {calculateTotalItemsInCart(cart)}</div>
        <Link href="./checkout">
          <a>Go to Checkout</a>
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <div>Your Cart is empty</div>
        <Link href={'/'}>
          <div>Back to Store</div>
        </Link>
      </>
    );
  }
}
