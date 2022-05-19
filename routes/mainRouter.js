import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

import { getNews, postNews, deleteNews } from '../controllers/mainController.js';

router.get('/news', authMiddleware, getNews);
router.post('/news-post', authMiddleware, postNews);
router.post('/news-delete', authMiddleware, deleteNews);

export default router;
