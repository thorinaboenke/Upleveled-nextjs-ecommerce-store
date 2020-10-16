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

// export const products = [
//   {
//     id: '1',
//     name: 'C-3PO',
//     description:
//       'Protocol droid intended to assist in etiquette, customs, and translation',
//     price: 100,
//     imgUrl: '/C3PO.png',
//   },
//   {
//     id: '2',
//     name: 'R2D2',
//     description: 'Astromech droid for machanic and co-pilot duties',
//     price: 200,
//     imgUrl: '/R2D2.png',
//   },
//   {
//     id: '3',
//     name: 'BB8',
//     description: 'Astromech droid',
//     price: 350,
//     imgUrl: '/BB8.png',
//   },
//   {
//     id: '4',
//     name: 'Probe',
//     description: 'Recon droid for deep space exploration and reconnaissance',
//     price: 80,
//     imgUrl: '/probe.png',
//   },
//   {
//     id: '5',
//     name: 'Droideka',
//     description:
//       'Destroyer droid equipped with twin blasters and own shield generators',
//     price: 450,
//     imgUrl: '/droideka.png',
//   },
//   {
//     id: '6',
//     name: 'Battle Droid',
//     description:
//       'Trade Federation standard battle droid - Discount on bulk orders',
//     price: 120,
//     imgUrl: '/battledroid.jpg',
//   },
//   {
//     id: '7',
//     name: 'Fixit',
//     description: 'FX-series medical assistant droid',
//     price: 80,
//     imgUrl: '/fx.jpg',
//   },
//   {
//     id: '8',
//     name: 'Surgeon Droid',
//     description: '2-1B medical droid',
//     price: 80,
//     imgUrl: '/surgical.png',
//   },
//   {
//     id: '9',
//     name: 'D-L-K',
//     description: 'Droid of unknown build, unknown origin - mostly scrap metal',
//     price: 15,
//     imgUrl: '/dalek.jpg',
//   },
// ];

export async function getProducts() {
  const allProducts = sql<ProductList>`
  SELECT * FROM products;`;
  return allProducts;
}

export async function getProductById(id: Id) {
  if (!/^\d+$/.test(id.toString())) return undefined;
  const products = await sql<ProductList>`
SELECT * FROM products WHERE
id = ${id}`;
  console.log('get product by id:', products[0]);
  return products[0];
}

export async function addProduct() {}

// console.log(process.env);
// filename .mjs to use import syntax in file
// give information on how to connect
// const sql = postgres();

//'postgres://username:password@localhost:5432/database'
//what comes back from sql is a promise
// export async function getUsers() {
//   const users = await sql`
// SELECT* from users

// `;
//   return users;
// }
// process.exit(0);

// how to run this code from

// on the file:

// export async function getServerSideProps(context) {
//   const {getUsers} = await import('.../../utlis/database to database');

// const users = await getUsers()

// return{
//   props:{
//     following: followingfromCookies,
//     users : users
//   }
// }
// }

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
  // const requiredProperties = ['productId', 'rating', 'reviewText'];
  // const reviewProperties = Object.keys(review);

  // if (reviewProperties.length !== requiredProperties.length) {
  //   return undefined;
  // }

  // const difference = reviewProperties.filter(
  //   (prop) => !requiredProperties.includes(prop),
  // );
  // if (difference.length > 0) {
  //   return undefined;
  // }

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
