import 'dotenv/config';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Role from '../Model/Role.js';
import User from '../Model/User.js';

const secret = process.env.SECRET;
const generateAccessToken = (id, roles) => {
  //информация о пользователе хранящееся в токене
  const payload = {
    id,
    roles,
  };
  //время жизни токена expiresIn
  return jwt.sign(payload, secret, { expiresIn: '1h' });
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
    await user.save();

    res.status(200).json({ message: 'Регистрация прошла успешно!' });
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
    return res
      .status(200)
      .json({ message: 'Вы успешно авторизовались', token, userId: user._id });
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

    jwt.verify(token, secret, (err, decodedData) => {
      if (decodedData) {
        return res
          .status(200)
          .json({ authorized: true, message: 'Вы авторизовались' });
      }
      if (err) {
        return res.json({ authorized: false, message: 'Вы не авторизовались' });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
