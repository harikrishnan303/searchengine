import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  // Simulate search results (replace with actual search logic)
  const results = [
    {
      link: 'https://example.com',
      title: 'Example Result',
      description: 'This is an example search result.',
    },
  ];

  res.status(200).json({ results });
}