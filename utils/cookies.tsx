import cookie from 'js-cookie';
import { Id, ProductCart, MergedProduct } from './types';

export function getCartFromCookies() {
  const cart = cookie.getJSON('cart') || [];
  return cart;
}

export function addAmountToCartInCookie(
  id: Id,
  quantity: number,
  cart: ProductCart = getCartFromCookies(),
) {
  // the id and quantity (as integer) are passed to the function
  // get the old cart from the Cookies
  let newCart: ProductCart;
  // first check if the cart exists (length) and the id is aleady in, filter will return true, then to make the new cart, map over existing cart, and where the id is the same as passed in, increase amount by the quantity
  // otherwise, cart is empty or does not contain the item yet, push item to new cart
  if (cart.length !== 0 && cart.find((item) => item.id === id)) {
    //console.log(cart);
    newCart = cart.map((item) =>
      item.id !== id ? item : { ...item, amount: item.amount += quantity },
    );
  } else if (cart.length !== 0) {
    newCart = [...cart];
    newCart.push({ id: id, amount: quantity });
  } else {
    newCart = [{ id: id, amount: quantity }];
  }
  // set the cookie to the new cart and return new cart
  cookie.set('cart', newCart);
  return newCart;
}

export function updateAmountInCartInCookie(
  id: Id,
  quantity: number,
  cart: ProductCart = getCartFromCookies(),
) {
  // the id and quantity (as integer) are passed to the function
  // get the old cart from the Cookies

  let newCart: ProductCart;
  // first check if the cart exists (length) and the id is aleady in, filter will return true, then to make the new cart, map over existing cart, and where the id is the same as passed in, update amount to the new value
  // otherwise, cart is empty or does not contain the item yet, push item to new cart
  if (cart.length !== 0 && cart.find((item) => item.id === id)) {
    //console.log(cart);
    newCart = cart.map((item) =>
      item.id !== id ? item : { ...item, amount: quantity },
    );
  } else if (cart.length !== 0) {
    newCart = [...cart];
    newCart.push({ id: id, amount: quantity });
  } else {
    newCart = [{ id: id, amount: quantity }];
  }
  // set the cookie to the new cart and return new cart
  cookie.set('cart', newCart);
  return newCart;
}

export function removeItemFromCartInCookie(
  id: Id,
  cart: ProductCart = getCartFromCookies(),
) {
  let newCart: ProductCart;
  // filter the card for all items that to NOT have the ID
  if (cart.length !== 0) {
    newCart = cart.filter((item) => item.id !== id);
  } else {
    newCart = cart;
  }
  cookie.set('cart', newCart);
  return newCart;
}

export function calculateTotalItemsInCart(cart: ProductCart) {
  if (!cart) {
    return 0;
  }
  const totalItems = cart.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return totalItems;
}

export function calculateTotalwithShipping(
  amount: any,
  minimumOrderValue: number,
  shippingFees: number,
) {
  if (typeof amount === 'string') {
    return amount;
  }
  if (amount < minimumOrderValue) {
    return amount + shippingFees;
  } else {
    return amount;
  }
}

export function calculateTotal(mergedCart: MergedProduct[]) {
  return mergedCart.reduce((acc, curr) => {
    return acc + curr.price * curr.amount;
  }, 0);
}

export function calculateSubtotal(mergedCart: MergedProduct[], id: Id) {
  return mergedCart.reduce((acc, curr) => {
    if (curr.id === id) return acc + curr.price * curr.amount;
    else {
      return acc;
    }
  }, 0);
}
