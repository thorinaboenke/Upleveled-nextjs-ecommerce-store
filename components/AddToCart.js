import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { addToCart } from '../functions.js';
import { addAmountToCartInCookie } from '../utils/cookies.tsx';
import { getCartFromCookies } from '../utils/cookies.tsx';

export default function AddToCart(props) {
  const [quantity, setQuantity] = useState(1);
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  function handleAddToCart(e) {
    e.preventDefault();
    const id = props.id;
    const quant = quantity;
    // here stuff has to happen with the cookie:
    addAmountToCartInCookie(id, parseInt(quant));
    setQuantity('1');
    props.setCart(getCartFromCookies());
  }

  return (
    <div>
      <form onSubmit={(e) => handleAddToCart(e)}>
        <input
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
