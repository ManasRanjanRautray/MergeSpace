import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const response = (res, user, status = 200) => res.status(status).json({ token: tokenFor(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role, college: user.college, branch: user.branch, year: user.year, avatar: user.avatar } });
export async function register(req, res) { try { const { name, email, password, college, branch, year } = req.body; if (await User.exists({ email })) return res.status(409).json({ message: 'An account already exists for this email' }); response(res, await User.create({ name, email, password, college, branch, year }), 201); } catch (e) { res.status(400).json({ message: e.message }); } }
export async function login(req, res) { const user = await User.findOne({ email: req.body.email?.toLowerCase() }).select('+password'); if (!user || !(await user.comparePassword(req.body.password))) return res.status(401).json({ message: 'Incorrect email or password' }); response(res, user); }
export const me = (req, res) => res.json({ user: req.user });
