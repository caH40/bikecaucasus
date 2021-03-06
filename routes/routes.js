import { Router } from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import {
  mainPage,
  trailPage,
  nonPage,
  passwordReset,
  galleryPage,
  dzhilsuPage,
  descriptionPage,
  getCardData,
  createTrailPage,
  sendFormCard,
  postTrailEdited,
  getDescriptionData,
  getUsers,
  postDescriptionComment,
  postDescriptionCommentEdit,
  postDescriptionCommentRemove,
  getDescriptionTrailEdit,
  postDescriptionTrailRemove,
  getResults,
  getResultEvent,
  postFileTrek,
  getTrek,
  getUser,
  robots,
  profile,
  profileGetInfo,
  profileGetEdit,
  profilePostEdit,
  takeKudos,
} from '../controllers/controller.js';
import fileMiddleware from '../app_modules/upload.js';
const router = new Router();

router.get('/', mainPage);
router.get('/main', mainPage);
router.get('/trail', trailPage);
router.get('/login', nonPage);
router.get('/password-reset', passwordReset);
router.get('/gallery', galleryPage);
//страница описания маршрута
router.get('/description', descriptionPage);
router.get('/description/getdata', authMiddleware, getDescriptionData);
router.get('/users', authMiddleware, getUsers);
router.post('/description/comment', authMiddleware, postDescriptionComment);
router.post('/description/comment-edit', authMiddleware, postDescriptionCommentEdit);
router.post('/description/comment-remove', authMiddleware, postDescriptionCommentRemove);

router.get('/description/trail-edit', authMiddleware, getDescriptionTrailEdit);
router.post('/trail-edited', authMiddleware, postTrailEdited);
router.post('/description/trail-remove', authMiddleware, postDescriptionTrailRemove);
//страница создания маршрута
router.get('/create-trail', createTrailPage);
//запись данных о маршруте в базу
router.post('/newcard', authMiddleware, sendFormCard);

//получение карточек маршрутов
// router.get('/trail/getcards', getCardData);
router.get('/trail/getcards', authMiddleware, getCardData);
//страница джил-су
router.get('/dzhilsu', dzhilsuPage);
router.get('/dzhilsu/main', authMiddleware, getResults);
router.get('/dzhilsu/event-result', authMiddleware, getResultEvent);
router.get('/dzhilsu/user', authMiddleware, getUser);
//загрузка файлов, фотографий
router.post('/uploadTrek', fileMiddleware.single('filedata'), postFileTrek);
router.get('/gettrek', getTrek);
router.get('/robots.txt', robots);
router.get('/profile', profile);
router.get('/profile/info', authMiddleware, profileGetInfo);
router.get('/profile/edit', authMiddleware, profileGetEdit);
router.post('/profile/edited', authMiddleware, profilePostEdit);
router.post('/kudos', authMiddleware, takeKudos);

export default router;
