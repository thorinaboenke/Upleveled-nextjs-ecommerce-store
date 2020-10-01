import cookie from 'js-cookie';

export function getCartfromCookies() {
  const cart = cookie.getJSON('cart') || [];
  return cart;
}

export function addAmountToCartInCookie(id, quantity) {
  // the id and quantity (as integer) are passed to the function
  // get the old cart from the Cookies
  const cart = getCartfromCookies();
  let newCart;
  // first check if the cart exists (length) and the id is aleady in, filter will return true, then to make the new cart, map over existing cart, and where the id is the same as passed in, increase amount by the quantity
  // otherwise, cart is empty or does not contain the item yet, push item to new cart
  if (cart.length !== 0 && cart.find((item) => item.id === id)) {
    //console.log(cart);
    newCart = cart.map((item) =>
      item.id !== id ? item : { ...item, amount: (item.amount += quantity) },
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
