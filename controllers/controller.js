import Card from '../Model/Card.js';
import Photo from '../Model/Photo.js';
import Result from '../Model/Result.js';
import Event from '../Model/Event.js';
import User from '../Model/User.js';

import path from 'path';

const __dirname = path.resolve();

export function mainPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
  } catch (error) {
    console.log(error);
  }
}

export function trailPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'trail.html'));
  } catch (error) {
    console.log(error);
  }
}
export function nonPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'dev.html'));
  } catch (error) {
    console.log(error);
  }
}
export function galleryPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'gallery.html'));
  } catch (error) {
    console.log(error);
  }
}
export function profile(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'profile.html'));
  } catch (error) {
    console.log(error);
  }
}
export async function profileGetInfo(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: 'Вы не авторизованны!' });
    }
    const profile = await User.findOne({ _id: userId });
    const dataEvent = await Event.find();
    const dataResult = await Result.find({ userId });

    const dataFormDb = { profile, dataEvent, dataResult };
    res.status(200).json(dataFormDb);
  } catch (error) {
    console.log(error);
  }
}
export async function profileGetEdit(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: 'Вы не авторизованны!' });
    }
    const dataFormDb = await User.findOne({ _id: userId });
    res.status(200).json(dataFormDb);
  } catch (error) {
    console.log(error);
  }
}

export async function profilePostEdit(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: 'Вы не авторизованны!' });
    }
    const {
      lastName,
      firstName,
      patronymic,
      birthday,
      city,
      team,
      gender,
      email,
      phone,
    } = req.body;
    const dataFormDb = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          lastName,
          firstName,
          patronymic,
          birthday,
          city,
          team,
          gender,
          email,
          phone,
        },
      }
    );
    res.status(201).json({ message: 'Изменения сохранились!' });
  } catch (error) {
    console.log(error);
  }
}

//страница описания ДжилыСу
export async function dzhilsuPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'dzhilsu.html'));
  } catch (error) {
    console.log(error);
  }
}

//страница описания маршрута
export async function descriptionPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'description.html'));
  } catch (error) {
    console.log(error);
  }
}
//страница создания маршрута
export function createTrailPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'create-route.html'));
  } catch (error) {
    console.log(error);
  }
}

//сохранение данных маршрута в Монго
export async function sendFormCard(req, res) {
  try {
    const data = req.body;
    if (!data.nameRoute) {
      console.log(new Date().toLocaleString(), data.nameRoute, data);
      return;
    }
    const id = new Date().getTime();
    const photo = await Photo({
      id,
      nameRoute: data.nameRoute,
      state: data.state,
      descPhoto: data.descPhoto,
      authorPhoto: data.authorPhoto,
    });
    photo.save();
    delete data.descPhoto;
    data.id = id;
    const card = await Card(data);
    card.save();
    res.status(201).send({ dispatched: true, id: data.id });
  } catch (error) {
    console.log(error);
  }
}
// получение всех карточек маршрутов из Монго
export async function getCardData(req, res) {
  try {
    res.status(200);
    const card = await Card.find({});
    res.send({ card, user: req.user });
  } catch (error) {
    console.log(error);
  }
}
// получение данных конкретного маршрута для формирования страницы description
export async function getDescriptionData(req, res) {
  try {
    res.status(200);
    const id = req.query.id;
    const card = await Card.findOne({ id: id });
    const photo = await Photo.findOne({ id: id });
    if (!photo) {
      console.log('В базе данных нет данной коллекции!');
      return;
    }
    const data = {
      descPhoto: photo.descPhoto,
      authorPhoto: photo.authorPhoto,
      card,
    };
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getResults(req, res) {
  try {
    let dataEvent = await Event.find({});
    let dataResult = await Result.find({});
    const data = { dataEvent, dataResult, user: req.user };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getResult(req, res) {
  try {
    const id = req.query.id;
    let dataEvent = await Event.find({ eventId: id });
    let dataResult = await Result.find({ eventId: id });
    const data = { dataEvent, dataResult, user: req.user };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
export async function getUser(req, res) {
  try {
    const id = req.query.id;
    let dataEvent = await Event.find();
    let dataResult = await Result.find({ athlete: id });
    const data = { dataEvent, dataResult, user: req.user };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function postFileTrek(req, res) {
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    console.log(error);
  }
}
export function getTrek(req, res) {
  try {
    const id = req.query.id;
    res.download(path.resolve(__dirname, 'treks', id));
  } catch (error) {
    console.log(error);
  }
}
export async function robots(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'robots.txt'));
  } catch (error) {
    console.log(error);
  }
}
