import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';
import { requireAuth } from '@/lib/apiAuth';
import slugify from 'slugify';

async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') return res.status(200).json(await Service.find({}).sort({ createdAt: -1 }));
  if (req.method === 'POST') {
    const slug = slugify(req.body.slug || req.body.title, { lower: true, strict: true });
    return res.status(201).json(await Service.create({ ...req.body, slug }));
  }
  return res.status(405).end();
}
export default (req, res) => (req.method === 'GET' ? handler(req, res) : requireAuth(handler)(req, res));
