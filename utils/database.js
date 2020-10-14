import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();
const sql = postgres();

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
  const allProducts = sql`
  SELECT * FROM products;`;
  return allProducts;
}

export async function getProductById(id) {
  if (!/^\d+$/.test(id)) return undefined;
  const products = await sql`
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
  const allReviews = await sql`
  SELECT * from reviews;`;
  return allReviews.map((r) => camelcaseKeys(r));
}

export async function getReviewsByProductId(p_id) {
  if (!/^\d+$/.test(p_id)) return undefined;
  const reviewsByProductId = await sql`
  SELECT * from reviews WHERE product_id = ${p_id};`;
  if (reviewsByProductId) {
    return reviewsByProductId.map((r) => camelcaseKeys(r));
  }
}
export async function getReviewsByUserId(u_id) {
  if (!/^\d+$/.test(u_id)) return undefined;
  const reviewsByUserId = await sql`
  SELECT * from reviews WHERE user_id = ${u_id};`;
  return reviewsByUserId.map((r) => camelcaseKeys(r));
}

export async function getReviewById(r_id) {
  if (!/^\d+$/.test(r_id)) return undefined;
  const reviewByReviewId = await sql`
  SELECT * from reviews WHERE review_id = ${r_id};`;
  return reviewByReviewId.map((r) => camelcaseKeys(reviewByReviewId))[0];
}

export async function insertReview(review) {
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

  const reviews = await sql`
INSERT INTO reviews
(product_id, rating, review_text )
VALUES
(${review.productId}, ${review.rating},${review.reviewText})
RETURNING *;`;
  return reviews.map((r) => camelcaseKeys(r))[0];
}

export async function deleteReviewById(r_id) {
  const reviews = await sql`
DELETE FROM reviews
WHERE review_id = ${r_id}
RETURNING *;
`;
  return reviews.map((r) => camelcaseKeys(r))[0];
}

export async function updateReviewById(r_id, review) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(r_id)) return undefined;

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

  let reviews = [];

  if ('reviewText' in review) {
    reviews = await sql`
      UPDATE reviews
        SET review_text = ${review.reviewText}
        WHERE review_id = ${r_id}
        RETURNING *;
    `;
  }

  if ('rating' in review) {
    reviews = await sql`
      UPDATE reviews
        SET rating = ${review.rating}
        WHERE review_id = ${r_id}
        RETURNING *;
    `;
  }
  return reviews.map((u) => camelcaseKeys(u))[0];
}
