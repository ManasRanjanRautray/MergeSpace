import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try { req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET).id).select('-password'); if (!req.user) throw new Error(); next(); }
  catch { res.status(401).json({ message: 'Invalid or expired token' }); }
}
export const authorize = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ message: 'Access denied' });
