import controller from '../controllers/mainController.js';

export default {
  async main() {
    await controller.main();
    controller.webCamera();
    this.menuNews();
    this.iconsNews();
  },
  async iconsNews() {
    //прослушка иконок в каждом новостном блоке
    const interactiveBlock = document.querySelector('#interactive-news__inner');

    interactiveBlock.addEventListener('click', (event) => {
      if (!event.target.matches('.interactive-news__icon-img')) return;
      const newsId = event.target.dataset.id;
      const iconId = event.target.id;

      if (iconId === 'icon-span__like') {
        controller.like(newsId);
      }
      // if (iconId === 'icon-span__comment') {
      //   controller.like(newsId);
      // }
      // if (iconId === 'icon-span__share') {
      //   controller.like(newsId);
      // }
      if (iconId === 'icon-span__dislike') {
        controller.dislike(newsId);
      }
    });
  },
  async menuNews() {
    //прослушка стрелки открытия меню в каждой новости
    const mainInnerNews = document.querySelector('#main__inner-news');

    mainInnerNews.addEventListener('click', (event) => {
      if (!event.target.matches('#popap-news__arrow-box')) return;
      const idNews = event.target.dataset.id;

      this.openMenu(idNews);
    });
  },
  openMenu(idNews, index) {
    const menuNewsCurrent = document.querySelector(`#popap-news-${idNews}`);
    const popapMenuNewsCurrent = document.querySelector(`#newsId-${idNews}`);
    const arrowMenuNewsCurrentPath = document.querySelector(`#popap-news__arrow-${idNews}  > path`);

    popapMenuNewsCurrent.classList.add('visible');
    arrowMenuNewsCurrentPath.classList.add('fill-arrow');

    const newsCreateBtn = document.querySelector(`#create-${idNews}`);
    const newsDeleteBtn = document.querySelector(`#remove-${idNews}`);
    const newsEditBtn = document.querySelector(`#edit-${idNews}`);

    //кнопка создания маршрута
    newsCreateBtn.addEventListener('click', handlerCreate, { once: true });
    function handlerCreate() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');
      controller.createNews(idNews);
    }
    //кнопка удаления маршрута
    newsDeleteBtn.addEventListener('click', handlerRemove, { once: true });
    function handlerRemove() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');

      controller.deleteNewsForm(idNews);
    }
    //кнопка редактирования маршрута
    newsEditBtn.addEventListener('click', handlerEdit, { once: true });
    function handlerEdit() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');

      controller.editNewsForm(idNews);
    }
    //очистка прослушек с кнопок Создание, Редактирование, Удаление
    menuNewsCurrent.addEventListener('mouseleave', handlerFocusOut, {
      once: true,
    });
    function handlerFocusOut() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');
      newsCreateBtn.removeEventListener('click', handlerCreate);
      newsDeleteBtn.removeEventListener('click', handlerRemove);
      newsEditBtn.removeEventListener('click', handlerEdit);
    }
  },
  createNewsBlock() {
    const blockNewsCreate = document.querySelector('#news-create');
    const loadImageBlock = document.querySelector('#news-create__image');
    const loadImageBtn = document.querySelector('#news-create__image-btn');
    const loadImageInput = document.querySelector('#news-create__image-input');
    const closeCross = document.querySelector('#news-create__remove-cross');
    const sendFormBtn = document.querySelector('#news-create__btn-send');

    //закрытие блока публикации новостей
    closeCross.addEventListener(
      'click',
      () => {
        blockNewsCreate.remove();
      },
      { once: true }
    );

    // кнопка загрузки картинки
    loadImageBtn.addEventListener('click', handlerLoadBtn);
    function handlerLoadBtn(event) {
      event.preventDefault();
      loadImageInput.click();
    }

    //интуп выбора файла картинки
    loadImageInput.addEventListener('change', handlerLoadFile);
    function handlerLoadFile(event) {
      const file = event.target.files[0];

      const newImageId = 'news-create__img';
      controller.inputImage(file, loadImageBlock, newImageId);
    }

    this.sendForm(sendFormBtn, blockNewsCreate);
  },
  crossImageRemove(loadImageBlock) {
    const cross = document.querySelector('#news-create__cross');
    cross.addEventListener(
      'click',
      () => {
        loadImageBlock.innerHTML = '';
      },
      { once: true }
    );
  },
  sendForm(sendFormBtn, blockNewsCreate) {
    sendFormBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const newsImage = document.querySelector('#news-create__img');
      const newsTitle = document.querySelector('#news-create__input');
      const newsText = document.querySelector('#news-create__area');

      const news = {};
      news.newsImage = newsImage.src;
      news.newsTitle = newsTitle.value;
      news.newsText = newsText.value;

      const url = '/main/news-post';

      controller.postNewsForm(news, blockNewsCreate, url);
    });
  },
  editNewsForm(newsId) {
    const blockNewsEdit = document.querySelector(`#news-edit-${newsId}`);
    const loadImageBlock = document.querySelector('#news-edit__image');
    const loadImageBtn = document.querySelector('#news-edit__image-btn');
    const loadImageInput = document.querySelector('#news-edit__image-input');
    const closeCross = document.querySelector('#news-edit__remove-cross');
    const sendFormBtn = document.querySelector('#news-edit__btn-send');

    //закрытие блока публикации новостей
    closeCross.addEventListener(
      'click',
      () => {
        blockNewsEdit.remove();
      },
      { once: true }
    );

    // кнопка загрузки картинки
    loadImageBtn.addEventListener('click', handlerLoadBtn);
    function handlerLoadBtn(event) {
      event.preventDefault();
      loadImageInput.click();
    }

    //интуп выбора файла картинки
    loadImageInput.addEventListener('change', handlerLoadFile);
    function handlerLoadFile(event) {
      const file = event.target.files[0];

      const newImageId = `news-edit__img-${newsId}`;
      controller.inputImage(file, loadImageBlock, newImageId);
    }
    this.sendEditedForm(newsId, sendFormBtn, blockNewsEdit);
  },
  sendEditedForm(newsId, sendFormBtn, blockNewsEdit) {
    sendFormBtn.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        //блок HTML вставки изображения общий для create и edit
        const newsImage = document.querySelector(`#news-edit__img-${newsId}`);
        const newsTitle = document.querySelector(`#news-edit__input-${newsId}`);
        const newsText = document.querySelector(`#news-edit__area-${newsId}`);

        const news = {};
        news.newsImage = newsImage.src;
        news.newsTitle = newsTitle.value;
        news.newsText = newsText.value;

        const url = '/main/news-edit';
        controller.postNewsForm(news, blockNewsEdit, url, newsId);
      },
      { once: true }
    );
  },
};
