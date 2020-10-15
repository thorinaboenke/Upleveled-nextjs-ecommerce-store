import styles from '../styles/Home.module.css';
import { FunctionComponent, useState } from 'react';

import { addAmountToCartInCookie, getCartFromCookies } from '../utils/cookies';
import { Id } from '../utils/types';

type AddToCartProps = {
  id: Id;
  setCart: FunctionComponent;
};

export default function AddToCart(props: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.currentTarget.value));
  };

  function handleAddToCart(e: React.FormEvent) {
    e.preventDefault();
    const id = props.id;
    const quant = quantity;
    // here stuff has to happen with the cookie:
    addAmountToCartInCookie(id, parseInt(quant));
    setQuantity(1);
    props.setCart(getCartFromCookies());
  }

  return (
    <div>
      <form onSubmit={(e) => handleAddToCart(e)}>
        <input
          aria-label="Quantity to add to cart"
          type="number"
          min="1"
          placeholder="quantity"
          value={quantity}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Add to Cart" />
      </form>
    </div>
  );
}
