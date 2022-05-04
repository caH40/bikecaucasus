import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

//функция будет давать доступ только зарегистрированным пользователям
export default function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    // если токена нет, то присваивается  роль guest
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      //для возможности использовать эти данные внутри других функций
      req.user = { roles: ['guest'] };
      return next();
    }
    jwt.verify(token, secret, (err, decodedData) => {
      req.user = decodedData;
      if (err) {
        req.user = { roles: ['guest'] };
      }
    });
    //вызываем следующий мидлваре по цепочке, если он есть
    next();
  } catch (error) {
    console.log(error);
    // return res.status(403).json({ message: 'Пользователь не авторизован' });
  }
}
