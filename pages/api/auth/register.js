import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await dbConnect();
  const { name, email, password, role = 'admin' } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'User exists' });
  const user = await User.create({ name, email, password: await hashPassword(password), role });
  return res.status(201).json({ id: user._id, email: user.email });
}
