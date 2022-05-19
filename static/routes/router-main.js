import controller from '../controllers/mainController.js';

export default {
  async main() {
    await controller.main();
    this.menuNews();
  },
  async iconsNews() {},
  async menuNews() {
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

      controller.inputImage(file, loadImageBlock);
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

      controller.postNewsForm(news, blockNewsCreate);
    });
  },
};
