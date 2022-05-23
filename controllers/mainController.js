import path from 'path';

import News from '../Model/News.js';
import KudosNews from '../Model/KudosNews.js';
import CommentNews from '../Model/CommentNews.js';
import downloadImage from '../app_modules/screen-dl.js';

const __dirname = path.resolve();

// получение всех новостей
export async function getNews(req, res) {
  try {
    const userId = req.user.id;
    const userRole = req.user.roles;

    const newsDb = await News.find({})
      .populate('kudoses')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: { path: 'postedBy', select: ['username', 'photoProfile'] },
      });
    const lengthNews = newsDb.length;
    let news = [];

    for (let i = lengthNews - 1; i >= 0; i--) {
      news.push(newsDb[i]);
    }

    news.forEach((oneNews) => {
      if (oneNews.kudoses.usersIdLike.includes(userId)) {
        oneNews.likeUser = true;
        oneNews.DislikeUser = false;
      }
      if (oneNews.kudoses.usersIdDislike.includes(userId)) {
        oneNews.likeUser = false;
        oneNews.DislikeUser = true;
      }
      oneNews.kudosQuantity =
        oneNews.kudoses.usersIdLike.length - oneNews.kudoses.usersIdDislike.length;
      oneNews.commentsQuantity = oneNews.comments.length;
    });

    res.status(200).json({ news, userRole, message: 'отправка новостей' });
  } catch (error) {
    res.status(400).json({ message: 'ошибка в отправке новостей' });
    console.log(error);
  }
}
// сохранение новой новости
export async function postNews(req, res) {
  try {
    if (!req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'У вас нет прав для этой операции' });
    }
    const userId = req.user.id;
    const { newsImage, newsTitle, newsText } = req.body;

    const date = new Date().getTime();

    const news = new News({ newsImage, newsTitle, newsText, postedBy: userId, date });
    const newsSaved = await news.save();

    const kudos = new KudosNews({ newsId: newsSaved._id });
    const kudosSaved = await kudos.save();

    await News.findOneAndUpdate({ _id: newsSaved._id }, { $set: { kudoses: kudosSaved._id } });
    res.status(201).json({ message: 'новость сохранена в БД' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при сохранении новости в БД' });
    console.log(error);
  }
}
// удаление новости
export async function deleteNews(req, res) {
  try {
    const { newsId } = req.body;

    await News.findOneAndDelete({ _id: newsId });
    await KudosNews.findOneAndDelete({ newsId: newsId });
    await CommentNews.deleteMany({ newsId });

    res.status(201).json({ message: 'новость удалена в БД' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при удалении новости в БД' });
    console.log(error);
  }
}
// сохранение отредактированной новости
export async function editNews(req, res) {
  try {
    const { newsId } = req.body;
    const { newsImage, newsTitle, newsText } = req.body;

    await News.findOneAndUpdate(
      { _id: newsId },
      { $set: { newsImage: newsImage, newsTitle, newsText } }
    );

    res.status(201).json({ message: 'Отредактированная новость сохранена в БД' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка сохранения отредактированной новости в БД' });
    console.log(error);
  }
}
// получение фотографии с вебкамеры
export async function screenshot(req, res) {
  try {
    res.status(200).download(path.resolve(__dirname, 'images/webcamera', 'webcam5.jpg'));
    downloadImage();
    // res.status(200).json({ message: 'отправка фотографии вебки' });
  } catch (error) {
    res.status(400).json({ message: 'ошибка в отправке отправке фотографии вебки' });
    console.log(error);
  }
}

//обработка нажатия на иконку лайка
export async function postLike(req, res) {
  try {
    const userId = req.user.id;
    const newsId = req.body.newsId;

    const kudos = await KudosNews.findOne({ newsId });
    let isUserPostLike = kudos.usersIdLike.includes(userId);
    let isUserPostDislike = kudos.usersIdDislike.includes(userId);
    //проверка на ошибку, юзер "поставил" одновременно лайк и дизлайк
    if (isUserPostLike && isUserPostDislike) {
      await KudosNews.findOneAndUpdate({ newsId }, { $pull: { usersIdDislike: userId } });
    }

    let kudosSaved;
    if (isUserPostLike) {
      kudosSaved = await KudosNews.findOneAndUpdate(
        { newsId },
        { $pull: { usersIdLike: userId } },
        { returnDocument: 'after' }
      );
    } else {
      await KudosNews.findOneAndUpdate({ newsId }, { $pull: { usersIdDislike: userId } });
      kudosSaved = await KudosNews.findOneAndUpdate(
        { newsId },
        { $push: { usersIdLike: userId } },
        { returnDocument: 'after' }
      );
    }

    const likesQuantity = kudosSaved.usersIdLike.length - kudosSaved.usersIdDislike.length;
    isUserPostLike = kudosSaved.usersIdLike.includes(userId);
    isUserPostDislike = kudosSaved.usersIdDislike.includes(userId);

    res
      .status(200)
      .json({ likesQuantity, isUserPostLike, message: 'Нажатие кнопки лайка обработано' });
  } catch (error) {
    console.log(error);
  }
}
export async function postDislike(req, res) {
  try {
    const userId = req.user.id;
    const newsId = req.body.newsId;

    const kudos = await KudosNews.findOne({ newsId });
    let isUserPostLike = kudos.usersIdLike.includes(userId);
    let isUserPostDislike = kudos.usersIdDislike.includes(userId);
    //проверка на ошибку, юзер "поставил" одновременно лайк и дизлайк
    if (isUserPostLike && isUserPostDislike) {
      await KudosNews.findOneAndUpdate({ newsId }, { $pull: { usersIdLike: userId } });
    }

    let kudosSaved;
    if (isUserPostDislike) {
      kudosSaved = await KudosNews.findOneAndUpdate(
        { newsId },
        { $pull: { usersIdDislike: userId } },
        { returnDocument: 'after' }
      );
    } else {
      await KudosNews.findOneAndUpdate({ newsId }, { $pull: { usersIdLike: userId } });
      kudosSaved = await KudosNews.findOneAndUpdate(
        { newsId },
        { $push: { usersIdDislike: userId } },
        { returnDocument: 'after' }
      );
    }

    const likesQuantity = kudosSaved.usersIdLike.length - kudosSaved.usersIdDislike.length;
    isUserPostDislike = kudosSaved.usersIdDislike.includes(userId);

    res
      .status(200)
      .json({ likesQuantity, isUserPostDislike, message: 'Нажатие кнопки дизлайка обработано' });
  } catch (error) {
    console.log(error);
  }
}

export async function postComment(req, res) {
  try {
    const userRole = req.user.roles;
    if (userRole.includes('guest')) {
      return res.status(401).json({ isAuthorization: false, message: 'Необходимо авторизоваться' });
    }
    const userId = req.user.id;
    const { newComment, newsId } = req.body;

    const date = new Date().getTime();

    const comment = new CommentNews({ newsId, text: newComment, postedBy: userId, date });
    const commentSaved = await comment.save();
    const newCommentId = commentSaved._id;

    const news = await News.findOneAndUpdate(
      { _id: newsId },
      { $push: { comments: newCommentId } },
      { returnDocument: 'after' }
    )
      .populate('comments')
      .populate({
        path: 'comments',
        populate: { path: 'postedBy', select: ['username', 'photoProfile'] },
      });
    // console.log(news.comments);
    const comments = news.comments;

    res
      .status(201)
      .json({ comments, userId, isAuthorization: true, message: 'Комментарий сохранён' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при сохранении комментария' });
    console.log(error);
  }
}
export async function removeComment(req, res) {
  try {
    const userRole = req.user.roles;
    if (userRole.includes('guest')) {
      return res.status(401).json({ isAuthorization: false, message: 'Необходимо авторизоваться' });
    }
    const userId = req.user.id;
    const { newsId, commentId } = req.body;

    const comment = await CommentNews.findByIdAndDelete({
      _id: commentId,
      newsId,
      postedBy: userId,
    });

    const newsSaved = await News.findOneAndUpdate(
      { _id: newsId },
      { $pull: { comments: comment._id } },
      { returnDocument: 'after' }
    )
      .populate('comments')
      .populate({
        path: 'comments',
        populate: { path: 'postedBy', select: ['username', 'photoProfile'] },
      });

    const comments = newsSaved.comments;

    res.status(201).json({ comments, userId, message: 'Комментарий удален' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при удалении комментария' });
    console.log(error);
  }
}
