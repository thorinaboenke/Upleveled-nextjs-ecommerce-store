import { Dispatch, SetStateAction, useState } from 'react';
import { addAmountToCartInCookie, getCartFromCookies } from '../utils/cookies';
import { Id, ProductCart } from '../utils/types';

type AddToCartProps = {
  id: Id;
  setCart: Dispatch<SetStateAction<ProductCart>>;
};

export default function AddToCart(props: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.currentTarget.value));
  };

  function handleAddToCart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = props.id;
    const quant = quantity;
    // here stuff has to happen with the cookie:
    addAmountToCartInCookie(id, quant);
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
          max="99"
          placeholder="quantity"
          value={quantity}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Add to Cart" />
      </form>
    </div>
  );
}
