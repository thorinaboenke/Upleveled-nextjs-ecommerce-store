import cookie from 'js-cookie';

export function getCartfromCookies() {
  const cart = cookie.getJSON('cart') || [5];
  return cart;
}

export function addAmountToCartInCookie(id, quantity) {
  // the id and quantity are passed to the function
  // get the old cart from the Cookies
  const cart = getCartfromCookies();

  let newCart = [];
  // if the id in the cart is the id argument passed in, increase the amount by the quantity passed in:
  // first check if the cart exists
  // to make the new cart, map over existing cart, and if the id is the same as passed in, increase amount by the quantity
  if (cart.length !== 0) {
    console.log(cart);
    newCart = cart.map((item) =>
      item.id !== id ? item : { ...item, amount: (amount += quantity) },
    );
  } else {
    newCart.push({ id: id, amount: quantity });
  }

  // set the cookie to the new cart and return new cart
  cookie.set('cart', newCart);
  return newCart;
}

export function removeItemfromCartInCookies(id) {
  const cart = getCartfromCookies();
  let newCart;
  // do the stuff to remove the item here
  cookie.set('cart', newCart);
  if (cart.length !== 0) {
    newCart = cart.filter((item) => item.id !== id);
  } else {
    newCart = cart;
  }
  return newCart;
}
