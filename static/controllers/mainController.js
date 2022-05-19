import { render } from '../view/viewer.js';
import router from '../routes/router-main.js';
import myFetch from '../utilities/myfetch.js';
import prepData from '../utilities/prep-data.js';

Handlebars.registerHelper('authUser', function (items, options) {
  let result = false;
  const authUser = localStorage.getItem('userBikeCaucasus');
  if (items === authUser) {
    result = true;
  }
  return result;
});

export default {
  async main() {
    try {
      const dataFormDb = await myFetch.fetchGet('/main/news');

      dataFormDb.news.forEach((news) => {
        news.date = new Date(Number(news.date)).toLocaleDateString();
      });
      // console.log(dataFormDb.news[0]);
      const dataTemplate = { list: dataFormDb.news };
      render(dataTemplate, '#mainTemplate');
    } catch (error) {
      console.log(error);
    }
  },
  createNews(idNews) {
    const blockNews = document.querySelector(`#block-news-${idNews}`);
    blockNews.insertAdjacentHTML(
      'afterend',
      `
      <div class="news-create" id="news-create">
        <h4 class="news-create__title">Блок публикации новостей</h4>
        <div class="news-create__block">
            <div class="news-create__remove-cross" id="news-create__remove-cross">&times</div>
            <div class="news-create__image" id="news-create__image"></div>
            <form class="news-create__form">
                <input class="news-create__input" type="text" placeholder="Заголовок новости"
                    id="news-create__input">
                <textarea class="news-create__area" name="create-news" rows="5"
                    id="news-create__area"></textarea>
                <button class="news-create__btn" id="news-create__image-btn"
                    type="submit">Загрузить</button>
                <input class="profile__img-input" type="file" accept=".jpg, .jpeg, .png, .webp"         id="news-create__image-input">
                <button class="news-create__btn" type="submit"
                    id="news-create__btn-send">Опубликовать</button>
            </form>
        </div>
      </div>
    `
    );
    //прослушка окна публикации новости
    router.createNewsBlock();
  },
};
