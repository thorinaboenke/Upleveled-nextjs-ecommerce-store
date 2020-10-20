import {
  calculateTotalItemsInCart,
  calculateTotal,
  calculateSubtotal,
} from '../cookies';
import { MergedProduct } from '../types';

const products: MergedProduct[] = [
  {
    id: 1,
    name: 'C-3PO',
    description:
      'Protocol droid intended to assist in etiquette, customs, and translation',
    price: 100,
    url: '/C3PO.png',
    amount: 2,
  },
  {
    id: 2,
    name: 'R2D2',
    description: 'Astromech droid for machanic and co-pilot duties',
    price: 200,
    url: '/R2D2.png',
    amount: 2,
  },
];

test('calculates the Total from merged Cart', () => {
  const totalEmptyCart = calculateTotal([]);
  expect(totalEmptyCart).toBe(0);
  const total = calculateTotal(products);
  expect(total).toBe(600);
});

test('calculates the Subtotal from merged Cart', () => {
  const totalEmptyCart = calculateSubtotal([], 1);
  expect(totalEmptyCart).toBe(0);
  const total = calculateSubtotal(products, 1);
  expect(total).toBe(200);
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
