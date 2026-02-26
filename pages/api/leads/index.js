import { dbConnect } from '@/lib/db';
import Lead from '@/models/Lead';
import { validateLead } from '@/utils/validators';
import { requireAuth } from '@/lib/apiAuth';
import { checkRateLimit } from '@/lib/rateLimit';

async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    const query = req.query.service ? { service: req.query.service } : {};
    return res.status(200).json(await Lead.find(query).sort({ createdAt: -1 }));
  }
  if (req.method === 'POST') {
    if (!checkRateLimit(req.socket.remoteAddress + ':lead', 8, 60_000)) return res.status(429).json({ message: 'Too many requests' });
    if (req.body.website) return res.status(400).json({ message: 'Spam blocked' });
    const err = validateLead(req.body);
    if (err) return res.status(400).json({ message: err });
    return res.status(201).json(await Lead.create(req.body));
  }
  return res.status(405).end();
}
export default (req, res) => (req.method === 'POST' ? handler(req, res) : requireAuth(handler)(req, res));
