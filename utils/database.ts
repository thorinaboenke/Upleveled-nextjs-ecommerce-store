import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import { Id, ProductList, Review, Reviews } from './types';
import extractHerokuDatabaseEnvVars from './extractHerokuDatabaseEnvVars';

extractHerokuDatabaseEnvVars();

dotenv.config();
const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

export async function getProducts() {
  const allProducts = sql<ProductList>`
  SELECT * FROM products;`;
  return allProducts;
}
export async function getProductsByIds(ids: Id[]) {
  if (ids.length !== 0) {
    const productsByIds = sql<ProductList>`
  SELECT * FROM products WHERE id IN (${ids});`;
    return productsByIds;
  } else return [];
}

export async function getProductById(id: Id) {
  if (!/^\d+$/.test(id.toString())) return undefined;
  const products = await sql<ProductList>`
SELECT * FROM products WHERE
id = ${id}`;
  return products[0];
}

export async function getReviews() {
  const allReviews = await sql<Reviews>`
  SELECT * from reviews;`;
  return allReviews.map((r) => camelcaseKeys(r));
}

export async function getReviewsByProductId(p_id: Id) {
  if (!/^\d+$/.test(p_id.toString())) return undefined;
  const reviewsByProductId = await sql<Reviews>`
  SELECT * from reviews WHERE product_id = ${p_id};`;
  if (reviewsByProductId) {
    return reviewsByProductId.map((r) => camelcaseKeys(r));
  }
}
export async function getReviewsByUserId(u_id: Id) {
  if (!/^\d+$/.test(u_id.toString())) return undefined;
  const reviewsByUserId = await sql<Reviews>`
  SELECT * from reviews WHERE user_id = ${u_id};`;
  return reviewsByUserId.map((r) => camelcaseKeys(r));
}

export async function getReviewById(r_id: Id) {
  if (!/^\d+$/.test(r_id.toString())) return undefined;
  const reviewByReviewId = await sql<Reviews>`
  SELECT * from reviews WHERE review_id = ${r_id};`;
  return reviewByReviewId.map((r) => camelcaseKeys(r))[0];
}

export async function insertReview(review: Review) {
  const reviews = await sql<Reviews>`
INSERT INTO reviews
(product_id, rating, review_text )
VALUES
(${review.productId}, ${review.rating},${review.reviewText})
RETURNING *;`;
  return reviews.map((r) => camelcaseKeys(r))[0];
}

export async function deleteReviewById(r_id: Id) {
  const reviews = await sql<Reviews>`
DELETE FROM reviews
WHERE review_id = ${r_id}
RETURNING *;
`;
  return reviews.map((r) => camelcaseKeys(r))[0];
}

export async function updateReviewById(r_id: Id, review: Review) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(r_id.toString())) return undefined;

  // const allowedProperties = ['reviewText', 'rating'];
  // const reviewProperties = Object.keys(review);

  // // if (reviewProperties.length < 1) {
  // //   return undefined;
  // // }

  // const difference = reviewProperties.filter(
  //   (prop) => !allowedProperties.includes(prop),
  // );

  // if (difference.length > 0) {
  //   return undefined;
  // }

  let reviews: Reviews = [];

  if ('reviewText' in review) {
    reviews = await sql<Reviews>`
      UPDATE reviews
        SET review_text = ${review.reviewText}
        WHERE review_id = ${r_id}
        RETURNING *;
    `;
  }

  if ('rating' in review) {
    reviews = await sql<Reviews>`
      UPDATE reviews
        SET rating = ${review.rating}
        WHERE review_id = ${r_id}
        RETURNING *;
    `;
  }
  return reviews.map((u) => camelcaseKeys(u))[0];
}
