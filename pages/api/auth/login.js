import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { comparePassword, signToken } from '@/utils/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!checkRateLimit(req.socket.remoteAddress + ':login', 10, 60_000)) return res.status(429).json({ message: 'Too many attempts' });
  await dbConnect();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await comparePassword(password, user.password))) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user._id, role: user.role, email: user.email });
  return res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
}
