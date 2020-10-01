import { useState } from 'react';
import cart from '../pages/cart';
import { products } from '../utils/database';
import styles from '../styles/Home.module.css';

export default function Cart({ cart }) {
  console.log(products);
  console.log(cart);

  const total = cart.reduce((acc, curr) => {
    return (
      acc +
      curr.amount *
        products.filter((product) => product.id === curr.id)[0].price
    );
  }, 0);
  console.log(total);
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
                  {products.filter((product) => product.id === item.id)[0].name}
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
          <div className={styles.total}>Total: {total}</div>
        </div>
      </div>
    </div>
  );
}
