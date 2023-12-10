import { NextApiRequest, NextApiResponse } from 'next';

export default async function accountHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // check if userId is a number
  const userId = Number(request.query.userId);
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  //  *** UPDATE **
  if (request.method === 'PUT') {
    response.status(200).json({});
    return;
  }

  if (request.method === 'GET') {
    response.status(405).json({});
    return;
  }

  response.status(405).json({
    errors: 'Method not supported',
  });
}
