import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

import { getNews } from '../controllers/mainController.js';

router.get('/news', authMiddleware, getNews);

export default router;
