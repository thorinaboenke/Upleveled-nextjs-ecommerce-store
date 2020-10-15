import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { calculateTotalItemsInCart } from '../utils/cookies';
import { removeItemFromCartInCookie } from '../utils/cookies';
import { updateAmountInCartInCookie } from '../utils/cookies';
import { getCartFromCookies } from '../utils/cookies';
import { calculateTotal, calculateTotalwithShipping } from '../utils/cookies';
import { ProductCart, ProductList } from '../utils/types';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

type CartProps = {
  cart: ProductCart;
  setCart: Dispatch<SetStateAction<ProductCart>>;
  databaseproducts: ProductList;
};

export const Cart: FunctionComponent<CartProps> = ({
  cart,
  setCart,
  databaseproducts,
}) => {
  const shippingFee = 49;
  const minOrderValue = 499;
  const products = databaseproducts;

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
                      products.find((product) => product.id === item.id)?.url
                    }
                    style={{ height: '100px' }}
                  />
                </div>
                <div className={styles.nameandquant}>
                  <div className={styles.name}>
                    {products.find((product) => product.id === item.id)?.name}
                  </div>

                  <div className={styles.quant}>
                    Quantity:{' '}
                    <input
                      type="number"
                      min="1"
                      value={item.amount}
                      onChange={(e) => {
                        updateAmountInCartInCookie(
                          item.id,
                          parseInt(e.target.value),
                        );
                        setCart(getCartFromCookies());
                      }}
                    />
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
                <div className={styles.placeholder} />
                <div className={styles.priceandsubtotal}>
                  <div>
                    {products.find((product) => product.id === item.id)?.price}
                  </div>
                  <div className={styles.subtotal}>
                    Subtotal:{' '}
                    {products.find((product) => product.id === item.id)
                      ?.price || 0 * item.amount}
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <div className={styles.subtotal}>
              Shipping Fees:{' '}
              {calculateTotal(cart, products) > minOrderValue ? 0 : shippingFee}
            </div>
          </div>
          <div>
            <div className={styles.total}>
              Total:{' '}
              {calculateTotalwithShipping(
                calculateTotal(cart, databaseproducts),
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
};
