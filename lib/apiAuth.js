import { verifyToken } from '@/utils/auth';

export function requireAuth(handler) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.replace('Bearer ', '');
      if (!token) return res.status(401).json({ message: 'Unauthorized' });
      req.user = verifyToken(token);
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
