import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dns from 'node:dns';

dotenv.config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env')
});

dns.setServers(['8.8.8.8', '1.1.1.1']);

 import http from 'http'; import express from 'express'; import cors from 'cors'; import morgan from 'morgan'; import { Server } from 'socket.io'; import { connectDB } from './config/db.js'; import authRoutes from './routes/authRoutes.js'; import postRoutes from './routes/postRoutes.js';
const app = express(); const server = http.createServer(app); const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true } });
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); app.use(express.json()); app.use(morgan('dev'));
app.get('/api/health', (_, res) => res.json({ status: 'ok' })); app.use('/api/auth', authRoutes); app.use('/api/posts', postRoutes);
app.use((err, _, res, __) => { console.error(err); res.status(500).json({ message: 'Something went wrong' }); });
io.on('connection', socket => { socket.on('join-room', roomId => socket.join(roomId)); socket.on('send-message', message => io.to(message.roomId).emit('new-message', message)); });
connectDB().then(() => server.listen(process.env.PORT || 5000, () => console.log('API ready')));
