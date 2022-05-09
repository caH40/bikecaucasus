import Card from '../Model/Card.js';
import Photo from '../Model/Photo.js';
import Result from '../Model/Result.js';
import Event from '../Model/Event.js';
import User from '../Model/User.js';
import Kudos from '../Model/Kudos.js';

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
      return res.status(401).json({ message: 'Вы не авторизованы!' });
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
      return res.status(401).json({ message: 'Вы не авторизованы!' });
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
      return res.status(401).json({ message: 'Вы не авторизованы!' });
    }
    const {
      lastName,
      firstName,
      patronymic,
      birthday,
      city,
      team,
      gender,
      // email,
      phone,
      photoProfile,
    } = req.body;

    await User.findOneAndUpdate(
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
          // email,
          phone,
          photoProfile,
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
// получение данных конкретного маршрута для формирования страницы description
export async function getDescriptionData(req, res) {
  try {
    const userId = req.user.id;
    const id = req.query.id;
    const kudos = await Kudos.findOneAndUpdate(
      { cardId: id },
      { $inc: { views: 1 } },
      {
        returnDocument: 'after',
      }
    );
    let like = false;
    let disLike = false;
    if (kudos.usersIdLike.includes(userId)) {
      like = true;
    }
    if (kudos.usersIdDisLike.includes(userId)) {
      disLike = true;
    }

    const kudoses = kudos.usersIdLike.length - kudos.usersIdDisLike.length;
    const views = kudos.views;
    const card = await Card.findOne({ _id: id });
    const photo = await Photo.findOne({ id: id });

    if (!photo) {
      return res
        .status(400)
        .json({ message: 'В базе данных нет данной коллекции! (photo)' });
    }
    const data = {
      descPhoto: photo.descPhoto,
      authorPhoto: photo.authorPhoto,
      card,
      kudos: { kudoses, views, status: { like, disLike } },
    };
    res.status(200).json(data);
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
    const kudos = await Kudos.find({});
    res.send({ card, kudos, user: req.user });
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
// обработка Kudosov
export async function takeKudos(req, res) {
  try {
    //проверка прав использования роутера

    if (req.user.roles[0] !== 'user') {
      return res.status(400).json({
        message: 'Лайк могут ставят только авторизованные пользователи',
        noAuthorization: true,
      });
    }
    const cardIdKudosed = req.body.cardId;
    const kudosGood = req.body.kudos;
    //id юзера, который ставит кудос
    const id = req.user.id;
    // console.log(cardIdKudosed, id);
    const candidateForKudos = await Kudos.findOne({
      cardId: cardIdKudosed,
    });

    //если нет документа Кудос с данным id маршрута, выходим из контроллера
    if (!candidateForKudos) {
      return res.status(400).json({
        message: `Нет документа Кудос для маршрута: ${cardIdKudosed}`,
      });
    }

    if (kudosGood) {
      //проверяем ставил ли данный юзер кудос этому маршруту
      if (candidateForKudos.usersIdLike.includes(id)) {
        const kudosDb = await Kudos.findOneAndUpdate(
          { cardId: cardIdKudosed },
          { $pull: { usersIdLike: id } },
          {
            returnDocument: 'after',
          }
        ).catch((error) => {
          console.log(error);
        });
        return res.status(200).json({
          message: 'Кудос снят',
          kudosGoodQuantity:
            kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
          remove: true,
        });
      } else {
        const kudosDb = await Kudos.findOneAndUpdate(
          { cardId: cardIdKudosed },
          { $push: { usersIdLike: id }, $pull: { usersIdDisLike: id } },
          {
            returnDocument: 'after',
          }
        ).catch((error) => {
          console.log(error);
        });
        return res.status(200).json({
          message: 'Кудос получен',
          kudosGoodQuantity:
            kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
          remove: false,
        });
      }
    } else {
      //проверяем ставил ли данный юзер дизКудос этому маршруту
      if (candidateForKudos.usersIdDisLike.includes(id)) {
        const kudosDb = await Kudos.findOneAndUpdate(
          { cardId: cardIdKudosed },
          { $pull: { usersIdDisLike: id } },
          {
            returnDocument: 'after',
          }
        );
        return res.status(200).json({
          message: 'Дизлайк снят',
          kudosGoodQuantity:
            kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
          remove: true,
        });
      } else {
        const kudosDb = await Kudos.findOneAndUpdate(
          { cardId: cardIdKudosed },
          { $push: { usersIdDisLike: id }, $pull: { usersIdLike: id } },
          {
            returnDocument: 'after',
          }
        );
        return res.status(200).json({
          message: 'Дизлайк получен',
          kudosGoodQuantity:
            kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
          remove: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
