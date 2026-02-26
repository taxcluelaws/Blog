import { dbConnect } from '@/lib/db';
import Lead from '@/models/Lead';
import { requireAuth } from '@/lib/apiAuth';

async function handler(req, res) {
  await dbConnect();
  if (req.method === 'PUT') return res.status(200).json(await Lead.findByIdAndUpdate(req.query.id, req.body, { new: true }));
  return res.status(405).end();
}
export default requireAuth(handler);
