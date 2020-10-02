import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { addToCart } from '../functions.js';
import { addAmountToCartInCookie } from '../utils/cookies.js';

export default function AddToCart(props) {
  //console.log(typeof props.id, props.id);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

 

  function handleAddtoCart(e) {
    e.preventDefault();
    const id = props.id;
    const quant = quantity;
    console.log(typeof id, id, quant);
    setIsLoading(true);
    // here stuff has to happen with the cookie:
    addAmountToCartInCookie(id, parseInt(quant));
    setIsLoading(false);
    setQuantity('1');
    //console.log(id, quant);
  }

  return (
    <div>
      <form onSubmit={(e) => handleAddtoCart(e)}>
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

export function getServerSideProps(context) {}
