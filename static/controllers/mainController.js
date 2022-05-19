import { render } from '../view/viewer.js';
import router from '../routes/router-main.js';
import myFetch from '../utilities/myfetch.js';
import reduceImage from '../utilities/reduce-image.js';

Handlebars.registerHelper('authUser', function (items, options) {
  let result = false;
  const authUser = localStorage.getItem('userBikeCaucasus');
  if (items === authUser) {
    result = true;
  }
  return result;
});
Handlebars.registerHelper('checkRoleUser', function (items, options) {
  let result = false;
  if (items.includes('admin')) {
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
        news.userRole = dataFormDb.userRole;
      });

      const dataTemplate = { list: dataFormDb.news };

      render(dataTemplate, '#mainTemplate');
      //если не было ни одной опубликованной новости
      if (!dataFormDb.news[0]) {
        this.createNews();
      }
    } catch (error) {
      console.log(error);
    }
  },
  createNews(idNews) {
    let blockNews;
    if (idNews) {
      blockNews = document.querySelector(`#block-news-${idNews}`);
    } else {
      blockNews = document.querySelector(`#main__inner-news`);
    }

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
                    id="news-create__area" placeholder="Текст новости"></textarea>
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
  inputImage(file, loadImageBlock) {
    loadImageBlock.innerHTML = '';

    const reader = new FileReader();
    reader.onload = async (e) => {
      const src = e.target.result;

      let sizeFile = Math.trunc(file.size / 8000);
      loadImageBlock.insertAdjacentHTML(
        'afterbegin',
        `<div class="news-create__preview">
        <div class="news-create__cross" id="news-create__cross">&times</div>
          <img src="${src}" id="news-create__img"/>
          <div class="news-create__preview-name">
            <span>${file.name}</span>
            <span>${sizeFile}kB</span>
          </div>
        </div>`
      );

      router.crossImageRemove(loadImageBlock);
    };
    reader.readAsDataURL(file);
  },
  async postNewsForm(news, blockNewsCreate) {
    // news.newsText = news.newsText.split('\n').join('<br>');

    const newsImage = await reduceImage(news.newsImage, 400);
    news.newsImage = newsImage;

    const response = await myFetch.fetchPost('/main/news-post', news);
    console.log(response);
    blockNewsCreate.innerHTML = '';
    window.location.reload();
  },
};
