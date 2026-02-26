import { dbConnect } from '@/lib/db';
import FAQ from '@/models/FAQ';
import { requireAuth } from '@/lib/apiAuth';

async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') return res.status(200).json(await FAQ.find({}));
  if (req.method === 'POST') return res.status(201).json(await FAQ.create(req.body));
  return res.status(405).end();
}
export default (req, res) => (req.method === 'GET' ? handler(req, res) : requireAuth(handler)(req, res));
