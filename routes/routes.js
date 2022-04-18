import { Router } from 'express';
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
} from '../controllers/controller.js';
import fileMiddleware from '../app_modules/upload.js';
const router = Router();

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
router.get('/trail/getcards', getCardData);
//страница джил-су
router.get('/dzhilsu', dzhilsuPage);
router.get('/dzhilsu/results', getResults);
router.get('/dzhilsu/result', getResult);
router.get('/dzhilsu/user', getUser);
//загрузка файлов, фотографий
router.post('/uploadTrek', fileMiddleware.single('filedata'), postFileTrek);
router.get('/gettrek', getTrek);

export default router;
