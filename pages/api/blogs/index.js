import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';
import { requireAuth } from '@/lib/apiAuth';
import slugify from 'slugify';

async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  }
  if (req.method === 'POST') {
    const slug = slugify(req.body.slug || req.body.title, { lower: true, strict: true });
    const blog = await Blog.create({ ...req.body, slug });
    return res.status(201).json(blog);
  }
  return res.status(405).end();
}

export default (req, res) => (req.method === 'GET' ? handler(req, res) : requireAuth(handler)(req, res));
