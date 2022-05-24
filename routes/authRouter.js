import { Router } from 'express';
import { check } from 'express-validator';

import {
  registration,
  login,
  checkToken,
  confirmUser,
  resetPassword,
  savePassword,
} from '../controllers/authController.js';

const router = new Router();

router.post(
  '/registration',
  check('username', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть меньше 4 и больше 20 символов').isLength({
    min: 4,
    max: 20,
  }),
  registration
);

router.post('/login', login);

router.post('/check-token', checkToken);
//активация нового аккаунта
router.get('/activation', confirmUser);
router.post('/password-reset', resetPassword);
router.post('/password-save', savePassword);

export default router;
