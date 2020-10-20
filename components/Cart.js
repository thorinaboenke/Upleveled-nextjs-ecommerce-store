import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {
  calculateSubtotal,
  updateAmountInCartInCookie,
  removeItemFromCartInCookie,
  calculateTotalItemsInCart,
  calculateTotal,
} from '../utils/cookies';
import { calculateTotalwithShipping } from '../utils/cookies';

export const Cart = ({ cart, setCart }) => {
  const shippingFee = 49;
  const minOrderValue = 499;

  if (cart.length > 0) {
    return (
      <div className={styles.cart}>
        <div className={styles.price}>price</div>
        <div className={styles.allitemcsontainer}>
          {cart.map((item) => {
            return (
              <div className={styles.itemcontainer} key={item.id}>
                <div className={styles.imagecontainer}>
                  <img alt="" src={item.url} style={{ height: '100px' }} />
                </div>
                <div className={styles.nameandquant}>
                  <div className={styles.name}>{item.name}</div>

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
                        setCart(
                          cart.map((itemInMergedCart) =>
                            itemInMergedCart.id !== item.id
                              ? itemInMergedCart
                              : {
                                  ...itemInMergedCart,
                                  amount: parseInt(e.target.value),
                                },
                          ),
                        );
                      }}
                    />
                    <button
                      className={styles.removebutton}
                      onClick={() => {
                        removeItemFromCartInCookie(item.id);
                        setCart(cart.filter((i) => i.id !== item.id));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.placeholder} />
                <div className={styles.priceandsubtotal}>
                  <div>{item.price}</div>
                  <div className={styles.subtotal}>
                    Subtotal: {calculateSubtotal(cart, item.id)}
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
          <div data-cy="cart-items-in-cart">
            Items: {calculateTotalItemsInCart(cart)}
          </div>
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
