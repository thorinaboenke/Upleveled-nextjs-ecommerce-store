import { NextApiRequest, NextApiResponse } from 'next';
import { getReviews, insertReview } from '../../../utils/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  let review;
  let reviews;

  if (request.method === 'GET') {
    reviews = await getReviews();
  } else if (request.method === 'POST') {
    const newReview = request.body.review;
    review = await insertReview(newReview);
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(
    JSON.stringify({
      // Only add "reviews" key to object if reviews exists
      // (eg. GET request)
      ...(reviews ? { reviews: reviews } : {}),
      // only add review key to object if review exists
      ...(review ? { review: review } : {}),
    }),
  );
}
