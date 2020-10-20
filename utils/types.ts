export type Id = number;
export type Price = number;
export type Amount = number;

export type Product = {
  id: Id;
  name: string;
  description: string;
  price: Price;
  url: string;
};
export type MergedProduct = {
  id: Id;
  name: string;
  description: string;
  price: Price;
  url: string;
  amount: number;
};

export type ProductList = Product[];

export type ProductInCart = {
  id: Id;
  amount: Amount;
};

export type ProductCart = ProductInCart[];

export type Review = {
  reviewId: Id;
  productId: Id;
  userId: Id;
  rating: number;
  reviewText: string;
};

export type Reviews = Review[];
