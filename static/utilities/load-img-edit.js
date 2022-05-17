import reduceImage from './reduce-image.js';
export default function (cardPhotoDb, descPhotoDb, data) {
  const inputAddCardPhoto = document.querySelector('#input__card-photo');
  const inputAddDescPhoto = document.querySelector('#input__desc-photo');
  const inputAddTrek = document.querySelector('#input__trek');

  const buttonAddCardPhoto = decorateInput(inputAddCardPhoto, 'ВЫБРАТЬ ФАЙЛ');
  const buttonAddDescPhoto = decorateInput(inputAddDescPhoto, 'ВЫБРАТЬ ФАЙЛЫ');
  const buttonAddTrek = decorateInput(inputAddTrek, 'ВЫБРАТЬ ФАЙЛ');

  function decorateInput(input, text) {
    const button = document.createElement('div');
    button.classList.add('box__btn', 'div__btn');
    button.textContent = text;
    input.insertAdjacentElement('afterend', button);
    return button;
  }

  //при клике на button тригерится input.click()
  buttonAddCardPhoto.addEventListener('click', () => {
    inputAddCardPhoto.click();
  });
  buttonAddDescPhoto.addEventListener('click', () => {
    inputAddDescPhoto.click();
  });
  buttonAddTrek.addEventListener('click', () => {
    inputAddTrek.click();
  });

  inputAddCardPhoto.setAttribute('accept', '.jpg, .jpeg, .png, .webp');
  inputAddCardPhoto.addEventListener('change', changeHandler);

  inputAddDescPhoto.setAttribute('accept', '.jpg, .jpeg, .png, .webp');
  inputAddDescPhoto.setAttribute('multiple', true);
  inputAddDescPhoto.addEventListener('change', changeHandlerImages);

  inputAddTrek.setAttribute('accept', '.fit, .gpx, .tcx');
  inputAddTrek.addEventListener('change', changeHandlerTrek);

  const boxCardPhoto = document.querySelector('#input__card-photo-images');
  const boxCardPhotoDesc = document.querySelector('#input__desc-photo-images');

  let filename = 'Картинка с сервера';
  boxCardPhoto.insertAdjacentHTML(
    'beforeend',
    `<div class="box__preview">
      <div class="box__preview-remove" data-name="${filename}">&times</div>
        <img src="${cardPhotoDb}" id="photo-desc-img"/>
        <div class="box__preview-name">
          <span>${filename}</span>
          <span>kB</span>
        </div>
      </div>`
  );

  descPhotoDb.forEach((photo, index) => {
    index++;
    boxCardPhotoDesc.insertAdjacentHTML(
      'beforeend',
      `
      <div class="box__preview">
      <div class="box__preview-remove" data-name="${filename} - ${index}">&times</div>
        <img src="${photo}" id="photo-desc-img" />
        <div class="box__preview-name">
          <span>${filename} - ${index}</span>
          <span>kB</span>
        </div>
      </div>
      `
    );
  });

  const svgCard = document.querySelector('#input__card-photo-img');
  const svgDesc = document.querySelector('#input__desc-photo-img');

  function changeHandler(event) {
    if (!event.target.files.length) {
      return;
    }

    let file = event.target.files[0];
    boxCardPhoto.innerHTML = '';

    //проверка на картинку
    if (!file.type.match('image')) {
      return;
    }
    //обработчик события, так как reader.readAsDataURL асинхронная функция
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const src = ev.target.result;
      //проверка в какой блок добавляется фотография
      //далее соответствующее уменьшение размеров фотографии
      //запись файлов в объект data
      const cardPhoto = await reduceImage(src, 250);

      let sizeFile = Math.trunc(file.size / 8000);
      boxCardPhoto.insertAdjacentHTML(
        'beforeend',

        `<div class="box__preview">
          <div class="box__preview-remove" data-name="${file.name}">&times</div>
            <img src="${cardPhoto}" id="photo-desc-img"/>
            <div class="box__preview-name">
              <span>${file.name}</span>
              <span>${sizeFile}kB</span>
            </div>
          </div>`
      );

      svgCard.classList.add('notEmpty');
    };
    reader.readAsDataURL(file);
  }

  //удаление фотографии
  boxCardPhoto.addEventListener('click', (event) => {
    if (!event.target.dataset.name) return;
    const name = event.target.dataset.name;
    svgCard.classList.remove('notEmpty');
    const block = boxCardPhoto
      .querySelector(`[data-name="${name}"]`)
      .closest('.box__preview');
    block.classList.add('removing');
    setInterval(() => {
      block.remove();
    }, 300);
  });

  let arrPhoto = [];
  function changeHandlerImages(event) {
    if (!event.target.files.length) {
      return;
    }
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (!file.type.match('image')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = async (ev) => {
        const src = ev.target.result;

        const srcSmall = await reduceImage(src, 700);
        arrPhoto.push({ filename: file.name, srcSmall });
        let sizeFile = Math.trunc(file.size / 8000);
        boxCardPhotoDesc.insertAdjacentHTML(
          'beforeend',
          `
          <div class="box__preview">
          <div class="box__preview-remove" data-name="${file.name}">&times</div>
            <img src="${srcSmall}" id="photo-desc-img" />
            <div class="box__preview-name">
              <span>${file.name}</span>
              <span>${sizeFile}kB</span>
            </div>
          </div>
          `
        );

        svgDesc.classList.add('notEmpty');
      };
      reader.readAsDataURL(file);
    });
  }

  //удаление фотографий
  boxCardPhotoDesc.addEventListener('click', (event) => {
    if (!event.target.dataset.name) return;
    const name = event.target.dataset.name;
    arrPhoto = arrPhoto.filter((file) => file.filename !== name);

    const block = boxCardPhotoDesc
      .querySelector(`[data-name="${name}"]`)
      .closest('.box__preview');
    block.classList.add('removing');
    setInterval(() => {
      block.remove();
    }, 300);

    if (arrPhoto.length === 0) {
      svgDesc.classList.remove('notEmpty');
    }
  });

  function changeHandlerTrek(event) {
    if (!event.target.files.length) {
      return;
    }

    const svg = document.getElementById(this.id + '-img');

    const newSpan = document.getElementById('trek-status-text');
    if (newSpan) {
      newSpan.remove();
    }
    const file = event.target.files[0];
    const fileName = file.name;
    let dataFileTrek = new FormData();
    dataFileTrek.append('filedata', file);
    data.fileTrek = dataFileTrek;
    data.fileTrekName = fileName;

    svg.insertAdjacentHTML(
      'beforebegin',
      `<span class="box__status-text" id="trek-status-text">${fileName}</span>`
    );
    svg.classList.add('notEmpty');
  }
}
