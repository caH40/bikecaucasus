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
} from '../controllers/controller.js';
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
router.get('/dzhilsu/getresults', getResults);
router.post('/', sendFormCard);

export default router;
