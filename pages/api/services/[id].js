import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';
import { requireAuth } from '@/lib/apiAuth';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === 'GET') return res.status(200).json(await Service.findOne({ $or: [{ _id: id }, { slug: id }] }));
  if (req.method === 'PUT') return res.status(200).json(await Service.findByIdAndUpdate(id, req.body, { new: true }));
  if (req.method === 'DELETE') return res.status(200).json(await Service.findByIdAndDelete(id));
  return res.status(405).end();
}
export default (req, res) => (req.method === 'GET' ? handler(req, res) : requireAuth(handler)(req, res));
