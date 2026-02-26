import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';
import { requireAuth } from '@/lib/apiAuth';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === 'GET') {
    const blog = await Blog.findOne({ $or: [{ _id: id }, { slug: id }] });
    return res.status(200).json(blog);
  }
  if (req.method === 'PUT') return res.status(200).json(await Blog.findByIdAndUpdate(id, req.body, { new: true }));
  if (req.method === 'DELETE') return res.status(200).json(await Blog.findByIdAndDelete(id));
  return res.status(405).end();
}

export default (req, res) => (req.method === 'GET' ? handler(req, res) : requireAuth(handler)(req, res));
