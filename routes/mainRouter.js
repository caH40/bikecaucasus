import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

import {
  getNews,
  postNews,
  deleteNews,
  editNews,
  screenshot,
  postLike,
  postDislike,
  postComment,
  removeComment,
} from '../controllers/mainController.js';

router.get('/news', authMiddleware, getNews);
router.post('/news-post', authMiddleware, postNews);
router.post('/news-delete', authMiddleware, deleteNews);
router.post('/news-edit', authMiddleware, editNews);
router.get('/screenshot', authMiddleware, screenshot);
router.post('/like', authMiddleware, postLike);
router.post('/dislike', authMiddleware, postDislike);
router.post('/post-comment', authMiddleware, postComment);
router.post('/remove-comment', authMiddleware, removeComment);

export default router;
