import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const signToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
export const hashPassword = (password) => bcrypt.hash(password, 10);
export const comparePassword = (password, hash) => bcrypt.compare(password, hash);
