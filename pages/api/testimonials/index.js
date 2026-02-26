import { dbConnect } from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { requireAuth } from '@/lib/apiAuth';

async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') return res.status(200).json(await Testimonial.find({}).sort({ createdAt: -1 }));
  if (req.method === 'POST') return res.status(201).json(await Testimonial.create(req.body));
  return res.status(405).end();
}
export default (req, res) => (req.method === 'GET' ? handler(req, res) : requireAuth(handler)(req, res));
