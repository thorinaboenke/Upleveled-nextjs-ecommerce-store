import {
  addAmountToCartInCookie,
  updateAmountInCartInCookie,
  removeItemFromCartInCookie,
} from '../cookies';
import { ProductCart } from '../types';
import cookie from 'js-cookie';

const cartWithItem: ProductCart = [
  { id: 1, amount: 1 },
  { id: 2, amount: 1 },
];
const cartWithoutItem: ProductCart = [{ id: 1, amount: 1 }];
const emptyCart: ProductCart = [];

test('increases the amount of an item in the cart by the specified quantity', () => {
  cookie.set('cart', []);
  const testId = 2;
  const testAmount = 1;

  const addToEmptyCart = addAmountToCartInCookie(testId, testAmount, emptyCart);
  expect(addToEmptyCart).toStrictEqual([{ id: testId, amount: testAmount }]);

  cookie.set('cart', []);
  const addToCartWithItem = addAmountToCartInCookie(
    testId,
    testAmount,
    cartWithItem,
  );

  expect(addToCartWithItem).toStrictEqual([
    { id: 1, amount: 1 },
    { id: 2, amount: 2 },
  ]);

  const test = cookie.getJSON('cart') || [];
  expect(test).toStrictEqual([
    { id: 1, amount: 1 },
    { id: 2, amount: 2 },
  ]);
  cookie.set('cart', []);

  const addToCartWithoutItem = addAmountToCartInCookie(
    testId,
    testAmount,
    cartWithoutItem,
  );
  expect(addToCartWithoutItem).toStrictEqual([
    ...cartWithoutItem,
    { id: testId, amount: testAmount },
  ]);
});

test('replaces the amount of an item in the cart in the cookie by the specified quantity', () => {
  const testId = 2;
  const testAmount = 5;
  cookie.set('cart', []);
  cookie.set('cart', cartWithItem);
  const newCart = updateAmountInCartInCookie(
    testId,
    testAmount,
    cookie.getJSON('cart'),
  );

  expect(newCart).toStrictEqual([
    { id: 1, amount: 1 },
    { id: testId, amount: testAmount },
  ]);

  expect(cookie.getJSON('cart')).toStrictEqual([
    { id: 1, amount: 1 },
    { id: testId, amount: testAmount },
  ]);
  expect(newCart.length === 2);
  expect(cookie.getJSON('cart').length === 2);
  cookie.set('cart', []);
});

test('deletes Item from Cart in Cookie', () => {
  cookie.set('cart', []);
  cookie.set('cart', cartWithItem);
  const testId = 2;
  const newCart = removeItemFromCartInCookie(
    testId,
    cookie.getJSON('cart') || [],
  );
  expect((newCart.length = cartWithItem.length - 1));
  expect((cookie.getJSON('cart').length = cartWithItem.length - 1));
  expect(cookie.getJSON('cart').some((item) => item.id === testId)).toBe(false);
  expect(newCart.some((item) => item.id === testId)).toBe(false);

  const deleteFromEmptyCart = removeItemFromCartInCookie(testId, []);
  expect(deleteFromEmptyCart).toStrictEqual([]);
  expect(cookie.getJSON('cart')).toStrictEqual([]);
});
