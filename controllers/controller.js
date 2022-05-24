import Card from '../Model/Card.js';
import Photo from '../Model/Photo.js';
import Result from '../Model/Result.js';
import Event from '../Model/Event.js';
import User from '../Model/User.js';
import Kudos from '../Model/Kudos.js';
import Comment from '../Model/Comment.js';

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
export function passwordReset(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'password-reset.html'));
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
    const userRole = req.user.roles;
    const userId = req.user.id;

    const id = req.query.id;
    let kudos;

    if (userId === '6274b392673579dda1aa2d42') {
      kudos = await Kudos.findOne({ cardId: id });
    } else {
      kudos = await Kudos.findOneAndUpdate(
        { cardId: id },
        { $inc: { views: 1 } },
        {
          returnDocument: 'after',
        }
      );
    }

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
    const card = await Card.findOne({ _id: id })
      .populate({ path: 'postedBy', select: 'username' })
      .populate({
        path: 'comments',
        populate: { path: 'postedBy', select: 'username' },
      });

    const photo = await Photo.findOne({ cardId: id });

    if (!photo) {
      return res.status(400).json({ message: 'В базе данных нет данной коллекции! (photo)' });
    }

    const data = {
      userRole,
      descPhoto: photo.descPhoto,
      authorPhoto: photo.authorPhoto,
      card,
      kudos: { kudoses, views, status: { like, disLike } },
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка в получении данных маршрута' });
    console.log(error);
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
}

//сохранение нового комментария
export async function postDescriptionComment(req, res) {
  try {
    //проверка прав использования роутера
    if (req.user.roles[0] !== 'user') {
      return res.status(401).json({
        message: 'Комментарии могут добавлять только авторизованные пользователи',
        noAuthorization: true,
      });
    }

    const postedBy = req.user.id;
    const username = await User.findOne({ _id: postedBy }).then((user) => user.username);
    const text = req.body.text;
    const date = req.body.date;
    const cardId = req.body.cardId;

    const commentNew = Comment({ cardId, text, postedBy, username, date });
    const commentSaved = await commentNew.save().catch((error) => console.log(error));

    const card = await Card.findOneAndUpdate(
      { _id: cardId },
      { $push: { comments: commentSaved._id } }
    );

    res.status(201).json({ message: 'Ваш комментарий сохранен!' });
  } catch (error) {
    console.log(error);
  }
}
//редактирование комментария
export async function postDescriptionCommentEdit(req, res) {
  try {
    //проверка прав использования роутера
    if (req.user.roles[0] !== 'user') {
      return res.status(401).json({
        message: 'Комментарии могут добавлять только авторизованные пользователи',
        noAuthorization: true,
      });
    }

    const commentId = req.body.commentId;
    const textNew = req.body.textNew;
    const dateChange = new Date().getTime();

    const commentNew = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $set: { text: textNew, dateChange } }
    );

    res.status(201).json({ message: 'Ваш комментарий изменён!' });
  } catch (error) {
    console.log(error);
  }
}
//удаление комментария
export async function postDescriptionCommentRemove(req, res) {
  try {
    //проверка прав использования роутера
    if (req.user.roles[0] !== 'user') {
      return res.status(401).json({
        message: 'Комментарии могут удалять только авторы комментария',
        noAuthor: true,
      });
    }
    const cardId = req.body.cardId;
    const commentId = req.body.commentId;

    const commentNew = await Comment.findOneAndDelete({ _id: commentId });

    const card = await Card.findOneAndUpdate({ _id: cardId }, { $pull: { comments: commentId } });

    res.status(201).json({ message: 'Ваш комментарий изменён!' });
  } catch (error) {
    console.log(error);
  }
}

//страница создания маршрута
export function createTrailPage(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'trail-create.html'));
  } catch (error) {
    console.log(error);
  }
}

//сохранение данных маршрута в Монго
export async function sendFormCard(req, res) {
  try {
    const data = req.body;
    const userId = req.user.id;
    data.postedBy = userId;
    data.date = new Date().getTime();
    if (!data.nameRoute) {
      console.log(new Date().toLocaleString());
      res.status(400).json({
        dispatched: false,
        message: 'Нет наименования маршрута',
      });
      return;
    }
    console.log(data);
    const card = new Card(data);
    const cardSaved = await card.save();

    const photo = new Photo({
      cardId: cardSaved.id,
      nameRoute: data.nameRoute,
      state: data.state,
      descPhoto: data.descPhoto,
      authorPhoto: data.authorPhoto,
    });
    await photo.save();

    const kudos = new Kudos({ cardId: cardSaved._id });
    const kudosSaved = await kudos.save();

    await Card.findOneAndUpdate({ _id: cardSaved._id }, { $set: { kudoses: kudosSaved._id } });

    res.status(201).send({ dispatched: true });
  } catch (error) {
    console.log(error);
  }
}
//сохранение изменённых данных маршрута в Монго
export async function postTrailEdited(req, res) {
  try {
    const data = req.body;
    const userId = req.user.id;

    data.postedBy = userId;
    data.date = new Date().getTime();

    if (!data.nameRoute) {
      console.log(new Date().toLocaleString());
      res.status(400).json({
        dispatched: false,
        message: 'Нет наименования маршрута',
      });
      return;
    }

    const card = await Card.findOneAndUpdate(
      { _id: data.cardIdOld },
      {
        $set: {
          nameRoute: data.nameRoute,
          state: data.state,
          bikeType: data.bikeType,
          start: data.start,
          turn: data.turn,
          finish: data.finish,
          distance: data.distance,
          ascent: data.ascent,
          descriptionArea: data.descriptionArea,
          urlTrekGConnect: data.urlTrekGConnect,
          dateEdit: data.date,
          cardPhoto: data.cardPhoto,
          urlVideo: data.urlVideo,
          fileTrekName: data.fileTrekName,
        },
      }
    );

    const photo = await Photo.findOneAndUpdate(
      { cardId: data.cardIdOld },
      {
        $set: {
          nameRoute: data.nameRoute,
          state: data.state,
          descPhoto: data.descPhoto,
          authorPhoto: data.authorPhoto,
        },
      }
    );

    res.status(201).send({ dispatched: true });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при сохранении изменений в маршруте' });
    console.log(error);
  }
}

export async function getDescriptionTrailEdit(req, res) {
  try {
    const cardId = req.query.cardid;
    const card = await Card.findOne({ _id: cardId });
    const photo = await Photo.findOne({ cardId });
    res.status(200).json({
      card,
      photo: photo,
      message: 'данные о маршруте из БД',
    });
  } catch (error) {
    console.log(error);
  }
}

export async function postDescriptionTrailRemove(req, res) {
  try {
    const cardId = req.body.cardId;

    const card = await Card.findOneAndDelete({ _id: cardId }).catch((error) => console.log(error));
    const photo = await Photo.findOneAndDelete({ cardId }).catch((error) => console.log(error));
    const kudos = await Kudos.findOneAndDelete({ cardId }).catch((error) => console.log(error));
    const comments = await Comment.deleteMany({ cardId }).catch((error) => console.log(error));

    res.status(201).json({ deleted: true, message: 'удаление карточки' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка - удаление карточки' });
    console.log;
  }
}

// получение всех карточек маршрутов из Монго
export async function getCardData(req, res) {
  try {
    const cards = await Card.find().populate('kudoses');
    res.status(200).json({ cards, user: req.user });
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
export async function getResultUrl(req, res) {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, 'static', 'dzhilsu-result.html'));
  } catch (error) {
    console.log(error);
  }
}

export async function getResultEvent(req, res) {
  try {
    const id = req.query.id;
    const target = req.query.target;
    if (target) {
      res.status(200);
      res.sendFile(path.resolve(__dirname, 'static', 'dzhilsu-result.html'));
      return;
    } else {
      let dataEvent = await Event.find({ eventId: id });
      let dataResult = await Result.find({ eventId: id });
      const data = { dataEvent, dataResult, user: req.user };
      res.status(200).json(data);
      return;
    }
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
    //получение старого названия трека
    if (req.query.trekname !== 'undefined') {
      const oldNameTrek = req.query.trekname;
      res.status(200).json({ message: 'Получил название нового файла' });
      return;
    }
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
      return res.status(401).json({
        message: 'Лайк могут ставят только авторизованные пользователи',
        noAuthorization: true,
      });
    }
    const cardIdKudosed = req.body.cardId;
    const kudosGood = req.body.kudos;
    //id юзера, который ставит кудос
    const id = req.user.id;
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
          kudosGoodQuantity: kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
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
          kudosGoodQuantity: kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
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
          kudosGoodQuantity: kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
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
          kudosGoodQuantity: kudosDb.usersIdLike.length - kudosDb.usersIdDisLike.length,
          remove: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
