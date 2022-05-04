import { Router } from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import {
  mainPage,
  trailPage,
  nonPage,
  galleryPage,
  dzhilsuPage,
  descriptionPage,
  getCardData,
  createTrailPage,
  sendFormCard,
  getDescriptionData,
  getResults,
  getResult,
  postFileTrek,
  getTrek,
  getUser,
  robots,
} from '../controllers/controller.js';
import fileMiddleware from '../app_modules/upload.js';
const router = new Router();

router.get('/', mainPage);
router.get('/main', mainPage);
router.get('/trail', trailPage);
router.get('/login', nonPage);
router.get('/gallery', galleryPage);
//страница описания маршрута
router.get('/description', descriptionPage);
router.get('/description/getdata', getDescriptionData);
//страница создания маршрута
router.get('/create-route', createTrailPage);
//запись данных о маршруте в базу
router.post('/', sendFormCard);
//получение карточек маршрутов
// router.get('/trail/getcards', getCardData);
router.get('/trail/getcards', authMiddleware, getCardData);
//страница джил-су
router.get('/dzhilsu', dzhilsuPage);
router.get('/dzhilsu/results', authMiddleware, getResults);
router.get('/dzhilsu/result', authMiddleware, getResult);
router.get('/dzhilsu/user', authMiddleware, getUser);
//загрузка файлов, фотографий
router.post('/uploadTrek', fileMiddleware.single('filedata'), postFileTrek);
router.get('/gettrek', getTrek);
router.get('/robots.txt', robots);

export default router;
