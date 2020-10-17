import {
  addAmountToCartInCookie,
  updateAmountInCartInCookie,
  removeItemFromCartInCookie,
  calculateTotalItemsInCart,
  calculateTotal,
} from '../cookies';
import { ProductCart, ProductList } from '../types';

const products: ProductList = [
  {
    id: 1,
    name: 'C-3PO',
    description:
      'Protocol droid intended to assist in etiquette, customs, and translation',
    price: 100,
    url: '/C3PO.png',
  },
  {
    id: 2,
    name: 'R2D2',
    description: 'Astromech droid for machanic and co-pilot duties',
    price: 200,
    url: '/R2D2.png',
  },
];

const cartWithItem: ProductCart = [
  { id: 1, amount: 1 },
  { id: 2, amount: 1 },
];
const cartWithoutItem: ProductCart = [{ id: 1, amount: 1 }];
const emptyCart: ProductCart = [];

test('increases the amount of an item in the cart by the specified quantity', () => {
  const testId = 2;
  const testAmount = 1;
  const addToEmptyCart = addAmountToCartInCookie(testId, testAmount, emptyCart);
  expect(addToEmptyCart).toStrictEqual([{ id: testId, amount: testAmount }]);
  const addToCartWithItem = addAmountToCartInCookie(
    testId,
    testAmount,
    cartWithItem,
  );
  expect(addToCartWithItem).toStrictEqual([
    { id: 1, amount: 1 },
    { id: 2, amount: 2 },
  ]);
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

test('replaces the amount of an item in the cart by the specified quantity', () => {
  const testId = 2;
  const testAmount = 5;
  const newCart = updateAmountInCartInCookie(testId, testAmount, [
    { id: testId, amount: 2 },
  ]);

  expect(newCart).toStrictEqual([{ id: testId, amount: testAmount }]);
  expect(newCart.length === 1);
});

test('deletes Item from Cart', () => {
  const testId = 2;
  const newCart = removeItemFromCartInCookie(testId, cartWithItem);
  expect((newCart.length = cartWithItem.length - 1));
  expect(newCart.filter((item) => item.id === testId)).toStrictEqual([]);

  const deleteFromEmptyCart = removeItemFromCartInCookie(testId, []);
  expect(deleteFromEmptyCart).toStrictEqual([]);
});

test('calculates the Total from a Shopping Cart and Product List', () => {
  const totalEmptyProductList = calculateTotal(cartWithItem, []);
  expect(totalEmptyProductList).toBe(undefined);
  const total = calculateTotal(
    [
      { id: 1, amount: 1 },
      { id: 2, amount: 1 },
    ],
    products,
  );
  expect(total).toBe(300);
});

test('calculates the number of Items in Cart', () => {
  const total = calculateTotalItemsInCart([
    { id: 1, amount: 1 },
    { id: 2, amount: 1 },
  ]);
  expect(total).toBe(2);
  const totalEmpty = calculateTotalItemsInCart([]);
  expect(totalEmpty).toBe(0);
});
