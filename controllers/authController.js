import 'dotenv/config';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import mailer from '../app_modules/nodemailer.js';
import Role from '../Model/Role.js';
import User from '../Model/User.js';
import UserConfirm from '../Model/User-confirm.js';

const secret = process.env.SECRET;
const generateAccessToken = (id, roles) => {
  //информация о пользователе хранящееся в токене
  const payload = {
    id,
    roles,
  };
  //время жизни токена expiresIn
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export async function registration(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Ошибка при регистрации', errors });
    }

    const { username, password, email } = req.body;

    // проверка наличия пользователя в базе с таким именем
    const candidate = await User.findOne({ username });
    if (candidate) {
      return res
        .status(403)
        .json({ message: 'Пользователь с таким именем уже существует' });
    }

    // проверка наличия пользователя в базе с email
    const candidateWithEmail = await User.findOne({ email });
    if (candidateWithEmail) {
      return res
        .status(403)
        .json({ message: 'Пользователь с таким e-mail уже существует' });
    }

    //кодируем пароль для хранения в базе данных
    const saltRounds = 8;
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    //по умолчанию регистрируются все правами user-ов
    const userRole = await Role.findOne({ value: 'user' });
    const user = new User({
      username,
      password: hashPassword,
      email,
      roles: [userRole.value],
    });
    const userId = await user.save().then((data) => data.id);
    //формирование токена подтверждения email
    const dateRegistration = new Date().getTime();
    const mailToken = bcrypt.hashSync(String(dateRegistration), 1);

    const confirm = new UserConfirm({
      userId,
      dateRegistration,
      token: mailToken,
      email,
    });
    await confirm.save();
    mailer(mailToken, email, username, password);
    res.status(200).json({ message: 'Регистрация прошла успешно!' });
    //блок отправки email с кодом подтверждения
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Ошибка при регистрации...' });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    //проверка существования пользователя с таким именем
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким именем не найден' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }
    //генерирование токена JWT
    const token = generateAccessToken(user._id, user.roles);
    return res.status(200).json({
      message: `С возвращением ${username}!`,
      token,
      userId: user._id,
      photoProfile: user.photoProfile,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: 'Ошибка при входе...необходимы уточнения' });
  }
}

//проверка авторизации
export async function checkToken(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.json({ authorized: false, message: 'Вы не авторизовались' });
    }

    jwt.verify(token, secret, async (err, decodedData) => {
      if (decodedData) {
        const { photoProfile, username } = await User.findOne({
          _id: decodedData.id,
        });
        // console.log(photoProfile);
        return res.status(200).json({
          authorized: true,
          photoProfile,
          message: `С возвращением ${username}!`,
        });
      }
      if (err) {
        return res.json({ authorized: false, message: 'Вы не авторизовались' });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//активация нового аккаунта
export async function confirmUser(req, res) {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).send('<h3>Нет токена активации.</h3>');
    }
    const { userId } = await UserConfirm.findOneAndDelete({ token });
    const confirmed = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { emailConfirm: true } }
    );
    res.status(200).send('<h3>Аккаунт активирован, e-mail подтвержден.<h3>');
  } catch (error) {
    res.status(400).send('<h3>Ошибка при активации аккаунта.</h3>');
  }
}
