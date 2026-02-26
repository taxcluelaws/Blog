import { dbConnect } from '@/lib/db';
import Setting from '@/models/Setting';
import { requireAuth } from '@/lib/apiAuth';

async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') return res.status(200).json(await Setting.find({}));
  if (req.method === 'POST') {
    const { key, value } = req.body;
    const setting = await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
    return res.status(200).json(setting);
  }
  return res.status(405).end();
}

export default (req, res) => (req.method === 'GET' ? handler(req, res) : requireAuth(handler)(req, res));
