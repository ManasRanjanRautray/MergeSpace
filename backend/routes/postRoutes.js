import { Router } from 'express'; import { createPost, getPosts, toggleLike } from '../controllers/postController.js'; import { protect } from '../middleware/auth.js';
const router = Router(); router.route('/').get(protect, getPosts).post(protect, createPost); router.put('/:id/like', protect, toggleLike); export default router;
