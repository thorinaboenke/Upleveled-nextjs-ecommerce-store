import { NextApiResponse, NextApiRequest } from 'next';
import {
  getReviewById,
  deleteReviewById,
  updateReviewById,
} from '../../../utils/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const reviewId = Number(request.query.id as string);

  if (!/^\d+$/.test(reviewId.toString())) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify({ errors: 'Not found' }));
  }

  let review;
  if (request.method === 'GET') {
    review = await getReviewById(reviewId);
  } else if (request.method === 'PATCH') {
    const newReview = request.body.review;
    review = await updateReviewById(reviewId, newReview);
  } else if (request.method === 'DELETE') {
    review = await deleteReviewById(reviewId);
  }
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ review: review }));
}
