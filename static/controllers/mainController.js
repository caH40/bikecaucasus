import { render } from '../view/viewer.js';
import router from '../routes/router-main.js';
import myFetch from '../utilities/myfetch.js';
import reduceImage from '../utilities/reduce-image.js';
import createWebcamImage from '../utilities/webcam-image.js';
import addPlus from '../utilities/addPlus.js';

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
Handlebars.registerHelper('isAuth', function (items, options) {
  if (items.includes('user') || items.includes('moderator') || items.includes('admin')) {
    return true;
  } else {
    return false;
  }
});

export default {
  async main() {
    try {
      const dataFormDb = await myFetch.fetchGet('/main/news');

      dataFormDb.news.forEach((news, index) => {
        news.date = new Date(Number(news.date)).toLocaleDateString();
        news.userRole = dataFormDb.userRole;
        news.positionNumber = index;
        news.commentsRevers = [];

        if (news.kudosQuantity > 0) {
          news.kudosQuantity = `+${news.kudosQuantity}`;
        }
        //реверс элементов массива комментариев
        let commentsQuantity = news.comments.length;
        if (commentsQuantity !== 0) {
          for (let i = commentsQuantity - 1; i >= 0; i--) {
            news.comments[i].date = new Date(news.comments[i].date).toLocaleString();
            news.commentsRevers.push(news.comments[i]);
          }
        }
      });

      const dataTemplate = { list: dataFormDb.news, userRole: dataFormDb.userRole };
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
    //для первой новости на сайте else
    if (idNews) {
      blockNews = document.querySelector(`#block-news-${idNews}`);
    } else {
      blockNews = document.querySelector(`#main__inner-news`);
    }
    let desktopView = '';
    if (window.innerWidth > 993) {
      desktopView = `<div class="news-create__image desktop" id="news-create__image"></div>`;
    }

    blockNews.insertAdjacentHTML(
      'afterend',
      `
      <div class="news-create" id="news-create">
        <h4 class="news-create__title">Блок публикации новостей</h4>
        <div class="news-create__block">
            <div class="news-create__remove-cross" id="news-create__remove-cross">&times</div>
            ${desktopView}
            <form class="news-create__form">
                <input class="news-create__input" type="text" placeholder="Заголовок новости"
                    id="news-create__input">
                <div class="news-create__image mobile" id="news-create__image"></div>
                <textarea class="news-create__area" name="create-news" rows="9"
                    id="news-create__area" placeholder="Текст новости"></textarea>
                <div class="news-create__buttons">
                    <button class="news-create__btn" id="news-create__image-btn"
                        type="submit">Картника</button>
                    <input class="profile__img-input" type="file" accept=".jpg, .jpeg, .png, .webp"         id="news-create__image-input">
                    <button class="news-create__btn" type="submit"
                        id="news-create__btn-send">Опубликовать</button>
                </div>
            </form>
        </div>
      </div>
    `
    );
    //прослушка окна публикации новости
    router.createNewsBlock();
  },
  inputImage(file, loadImageBlock, newImageId) {
    loadImageBlock.innerHTML = '';

    const reader = new FileReader();
    reader.onload = async (e) => {
      const src = e.target.result;

      let sizeFile = Math.trunc(file.size / 8000);
      loadImageBlock.insertAdjacentHTML(
        'afterbegin',
        `<div class="news-create__preview">
        <div class="news-create__cross" id="news-create__cross">&times</div>
          <img class="news__img" src="${src}" id="${newImageId}"/>
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

  async postNewsForm(news, blockNewsCreate, url, newsId) {
    news.newsText = news.newsText.split('\n').join('<br>');

    const newsImage = await reduceImage(news.newsImage, 600);
    news.newsImage = newsImage;
    news.newsId = newsId;

    const response = await myFetch.fetchPost(url, news);
    console.log(response);
    blockNewsCreate.innerHTML = '';
    router.main();
  },

  async deleteNewsForm(newsId) {
    const response = await myFetch.fetchPost('/main/news-delete', { newsId });
    console.log(response);
    router.main();
  },

  async editNewsForm(newsId) {
    const newsImage = document.querySelector(`#news__img-${newsId}`).src;
    const newsTitle = document.querySelector(`#box-news__title-${newsId}`).innerHTML;
    const newsText = document.querySelector(`#box-news__text-${newsId}`).innerHTML;

    const blockNews = document.querySelector(`#block-news-${newsId}`);

    let desktopView = '';
    if (window.innerWidth > 993) {
      desktopView = `<div class="news-create__image desktop" id="news-edit__image">
      <img class="news__img" src="${newsImage}" alt="картинка новости" id="news-edit__img-${newsId}">
  </div>`;
    }

    blockNews.insertAdjacentHTML(
      'afterend',
      `
      <div class="news-create" id="news-edit-${newsId}">
        <h4 class="news-create__title">Редактирование</h4>
        <div class="news-create__block">
            <div class="news-create__remove-cross" id="news-edit__remove-cross">&times</div>
            ${desktopView}
            <form class="news-create__form">
                <input class="news-create__input" type="text" placeholder="Заголовок новости" value="${newsTitle}"
                    id="news-edit__input-${newsId}">
                    <div class="news-create__image mobile" id="news-edit__image">
                       <img class="news__img" src="${newsImage}" alt="картинка новости" id="news-edit__img-${newsId}">
                    </div>
                <textarea class="news-create__area" name="create-news" rows="9"
                    id="news-edit__area-${newsId}" placeholder="Текст новости">${newsText}</textarea>
                <div class="news-create__buttons">
                    <button class="news-create__btn" id="news-edit__image-btn"
                        type="submit">Картника</button>
                    <input class="profile__img-input" type="file" accept=".jpg, .jpeg, .png, .webp" id="news-edit__image-input">
                    <button class="news-create__btn" type="submit"
                        id="news-edit__btn-send">Опубликовать</button>
                </div>
            </form>
        </div>
      </div>
      `
    );

    router.editNewsForm(newsId);
  },

  async webCamera() {
    //первоначальная загрузка картинки при открытии страницы
    createWebcamImage();
    setInterval(async () => {
      createWebcamImage();
    }, 60000);
  },

  async like(newsId) {
    if (!newsId) return;
    const response = await myFetch.fetchPost('/main/like', { newsId });

    const likesQuantity = response.likesQuantity;
    const isUserPostLike = response.isUserPostLike;

    const likeNumber = document.querySelector(`#likesQuantity-${newsId}`);
    likeNumber.innerHTML = addPlus(likesQuantity);

    const iconLiked = document.querySelector(`#icon-path__liked-${newsId}`);
    const iconDisliked = document.querySelector(`#icon-path__disliked-${newsId}`);

    if (isUserPostLike) {
      iconLiked.classList.add('icon-fill');
      iconDisliked.classList.remove('icon-fill');
    } else {
      iconLiked.classList.remove('icon-fill');
    }
  },

  async dislike(newsId) {
    if (!newsId) return;
    const response = await myFetch.fetchPost('/main/dislike', { newsId });

    const likesQuantity = response.likesQuantity;
    const isUserPostDislike = response.isUserPostDislike;

    const likeNumber = document.querySelector(`#likesQuantity-${newsId}`);
    likeNumber.innerHTML = addPlus(likesQuantity);

    const iconLiked = document.querySelector(`#icon-path__liked-${newsId}`);
    const iconDisliked = document.querySelector(`#icon-path__disliked-${newsId}`);

    if (isUserPostDislike) {
      iconDisliked.classList.add('icon-fill');
      iconLiked.classList.remove('icon-fill');
    } else {
      iconDisliked.classList.remove('icon-fill');
    }
  },
  comments(newsId) {
    const comments = document.querySelector(`#comments-news-${newsId}`);

    comments.classList.toggle('visible');
    router.commentsForm(newsId);
  },

  async sendComment(newsId) {
    const areaComment = document.querySelector(`#comments-news__area-${newsId}`);
    const boxComments = document.querySelector(`#comments-news__box-comment-${newsId}`);
    const commentsQuantity = document.querySelector(`#commentsQuantity-${newsId}`);

    const newComment = areaComment.value;
    const commentsFromDb = await myFetch.fetchPost('/main/post-comment', { newComment, newsId });

    if (!commentsFromDb.isAuthorization) {
      console.log(commentsFromDb.message);
      return;
    }
    const lengthComments = commentsFromDb.comments.length;
    commentsQuantity.innerHTML = lengthComments;

    boxComments.innerHTML = '';
    commentsFromDb.comments.forEach((comment) => {
      let crossRemove = '';
      if (commentsFromDb.userId === comment.postedBy._id) {
        crossRemove = `<div class="comments-news__cross-remove" id="comments-news__cross-remove-${comment._id}">&times</div>`;
      } else {
        crossRemove = '';
      }

      boxComments.insertAdjacentHTML(
        'afterbegin',
        `
    <div class="comments-news__comment">
      <div class="comments-news__comment-inner">
        <img class="comments-news__user-img" src="${comment.postedBy.photoProfile}" alt="">
        <span class="comments-news__name-user">${comment.postedBy.username}</span>
        <div class="comments-news__date">${new Date(comment.date).toLocaleString()}</div>
      </div>
      <div class="comments-news__comment-inner">
        <div class="comments-news__text">${comment.text}</div>
        ${crossRemove}
      </div>
    </div>
    
    `
      );
    });

    areaComment.value = '';
  },
  async removeComment(newsId, commentId) {
    const boxComments = document.querySelector(`#comments-news__box-comment-${newsId}`);
    const commentsQuantity = document.querySelector(`#commentsQuantity-${newsId}`);

    const commentsFromDb = await myFetch.fetchPost('/main/remove-comment', { newsId, commentId });

    const lengthComments = commentsFromDb.comments.length;
    commentsQuantity.innerHTML = lengthComments;

    boxComments.innerHTML = '';
    commentsFromDb.comments.forEach((comment) => {
      let crossRemove = '';
      if (commentsFromDb.userId === comment.postedBy._id) {
        crossRemove = `<div class="comments-news__cross-remove" id="comments-news__cross-remove-${comment._id}">&times</div>`;
      } else {
        crossRemove = '';
      }
      boxComments.insertAdjacentHTML(
        'afterbegin',
        `
    <div class="comments-news__comment">
      <div class="comments-news__comment-inner">
        <img class="comments-news__user-img" src="${comment.postedBy.photoProfile}" alt="">
        <span class="comments-news__name-user">${comment.postedBy.username}</span>
        <div class="comments-news__date">${new Date(comment.date).toLocaleString()}</div>
      </div>

      <div class="comments-news__comment-inner">
        <div class="comments-news__text">${comment.text}</div>
        ${crossRemove}
      </div>
    </div>

    `
      );
    });
  },
};
