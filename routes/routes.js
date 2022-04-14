import { Router } from 'express';
import {
  mainPage,
  trailPage,
  eventsPage,
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
} from '../controllers/controller.js';
import fileMiddleware from '../app_modules/upload.js';
const router = Router();

router.get('/', mainPage);
router.get('/main', mainPage);
router.get('/trail', trailPage);
router.get('/events', eventsPage);
router.get('/gallery', galleryPage);
router.get('/dzhilsu', dzhilsuPage);
router.get('/description', descriptionPage);
router.get('/create-route', createTrailPage);

router.get('/trail/getcards', getCardData);
router.get('/description/getdata', getDescriptionData);
router.get('/dzhilsu/results', getResults);
router.get('/dzhilsu/result', getResult);
router.post('/', sendFormCard);
router.post('/uploadTrek', fileMiddleware.single('filedata'), postFileTrek);

export default router;
