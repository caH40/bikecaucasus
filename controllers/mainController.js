import News from '../Model/News.js';
import KudosNews from '../Model/KudosNews.js';
import CommentNews from '../Model/CommentNews.js';

// получение всех новостей
export async function getNews(req, res) {
  try {
    const userId = req.user.id;
    const userRole = req.user.roles;

    const newsDb = await News.find({}).populate('kudoses').populate('comments');
    const lengthNews = newsDb.length;
    let news = [];

    for (let i = lengthNews - 1; i >= 0; i--) {
      news.push(newsDb[i]);
    }

    news.forEach((oneNews) => {
      if (oneNews.kudoses.usersIdLike.includes(userId)) {
        oneNews.likeUser = true;
        oneNews.dislikeUser = false;
      }
      if (oneNews.kudoses.usersIdDisLike.includes(userId)) {
        oneNews.likeUser = false;
        oneNews.dislikeUser = true;
      }
      oneNews.kudosQuantity =
        oneNews.kudoses.usersIdLike.length - oneNews.kudoses.usersIdDisLike.length;
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
