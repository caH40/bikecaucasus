import { Router } from 'express';
import {
  mainPage,
  routesPage,
  eventsPage,
  galleryPage,
  dzhilsuPage,
  descriptionPage,
  getCardData,
  createRoutePage,
  sendFormCard,
  getDescriptionData,
} from '../controllers/controler.js';
const router = Router();

router.get('/', mainPage);
router.get('/main', mainPage);
router.get('/routes', routesPage);
router.get('/events', eventsPage);
router.get('/gallery', galleryPage);
router.get('/dzhilsu', dzhilsuPage);
router.get('/description', descriptionPage);
router.get('/create-route', createRoutePage);

router.get('/routes/getcards', getCardData);
router.get('/description/getdata', getDescriptionData);
router.post('/', sendFormCard);

export default router;
