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
    const newsEditBtn = document.querySelector(`#edit-${idNews}`);
    const newsDeleteBtn = document.querySelector(`#remove-${idNews}`);

    newsCreateBtn.addEventListener('click', handlerCreate);
    function handlerCreate() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');
      controller.createNews(idNews);
    }
    newsEditBtn.addEventListener('click', handlerEdit);
    function handlerEdit() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');
    }

    newsDeleteBtn.addEventListener('click', handlerRemove);
    function handlerRemove() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');
    }

    menuNewsCurrent.addEventListener('mouseleave', handlerFocusOut, {
      once: true,
    });
    function handlerFocusOut() {
      popapMenuNewsCurrent.classList.remove('visible');
      arrowMenuNewsCurrentPath.classList.remove('fill-arrow');
      newsCreateBtn.removeEventListener('click', handlerCreate);
      newsEditBtn.removeEventListener('click', handlerEdit);
      newsDeleteBtn.removeEventListener('click', handlerRemove);
    }
  },
  createNewsBlock() {
    const blockNewsCreate = document.querySelector('#news-create');
    const loadImageBlock = document.querySelector('#news-create__image');
    const loadImageBtn = document.querySelector('#news-create__image-btn');
    const loadImageInput = document.querySelector('#news-create__image-input');
    const closeCross = document.querySelector('#news-create__remove-cross');
    const sendForm = document.querySelector('#news-create__btn-send');

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
      loadImageBlock.innerHTML = '';

      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target.result;

        let sizeFile = Math.trunc(file.size / 8000);
        loadImageBlock.insertAdjacentHTML(
          'afterbegin',
          `<div class="news-create__preview">
          <div class="news-create__cross" id="news-create__cross">&times</div>
            <img src="${src}" id="photo-desc-img"/>
            <div class="news-create__preview-name">
              <span>${file.name}</span>
              <span>${sizeFile}kB</span>
            </div>
          </div>`
        );

        const cross = document.querySelector('#news-create__cross');
        cross.addEventListener(
          'click',
          () => {
            loadImageBlock.innerHTML = '';
          },
          { once: true }
        );
      };
      reader.readAsDataURL(file);
    }
  },
};
