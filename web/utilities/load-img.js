export default function loadimg(data) {
  const inputAddCardPhoto = document.querySelector('#input__card-photo');
  const inputAddDescPhoto = document.querySelector('#input__desc-photo');
  const inputAddTrek = document.querySelector('#input__trek');

  const buttonAddCardPhoto = decorateInput(inputAddCardPhoto, 'ВЫБРАТЬ ФАЙЛ');
  const buttonAddDescPhoto = decorateInput(inputAddDescPhoto, 'ВЫБРАТЬ ФАЙЛЫ');
  const buttonAddTrek = decorateInput(inputAddTrek, 'ВЫБРАТЬ ФАЙЛ');

  function decorateInput(input, text) {
    const button = document.createElement('div');
    // button.classList.add('box__btn');
    button.classList.add('box__btn', 'div__btn');
    button.textContent = text;
    input.insertAdjacentElement('afterend', button);
    return button;
  }

  //при клике на button тригерится input.clicl()
  buttonAddCardPhoto.addEventListener('click', () => {
    inputAddCardPhoto.click();
  });
  buttonAddDescPhoto.addEventListener('click', () => {
    inputAddDescPhoto.click();
  });
  buttonAddTrek.addEventListener('click', () => {
    inputAddTrek.click();
  });

  function changeHandler(event) {
    if (!event.target.files.length) {
      return;
    }

    const svg = document.getElementById(this.id + '-img');
    //переводим FileList в массив, что бы удобнее с ним работать
    const files = Array.from(event.target.files);

    const divImageCard = document.querySelector(`#${this.id}-images`);
    //там где добовляется одна фотография, при повторном обращении к интупту очищать innerHTML от старого фото
    if (this.id === 'input__card-photo') {
      divImageCard.innerHTML = '';
    }
    let arrPhoto = data.descPhoto ?? [];
    files.forEach((file) => {
      //проверка на картинку
      if (!file.type.match('image')) {
        return;
      }

      //обработчик события, так как reader.readAsDataURL асинхронная функция
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target.result;
        //запись файлов в объект data
        if (this.id === 'input__card-photo') {
          data.cardPhoto = src;
        } else {
          arrPhoto.push(src);
        }

        divImageCard.insertAdjacentHTML(
          'beforeend',
          `<img class="box__img" src="${src}" />`
        );
        svg.classList.add('notEmpty');
      };

      reader.readAsDataURL(file);
    });

    data.descPhoto = arrPhoto;
  }

  inputAddCardPhoto.setAttribute('accept', '.jpg, .jpeg, .png, .webp');
  inputAddCardPhoto.addEventListener('change', changeHandler);

  inputAddDescPhoto.setAttribute('accept', '.jpg, .jpeg, .png, .webp');
  inputAddDescPhoto.setAttribute('multiple', true);
  inputAddDescPhoto.addEventListener('change', changeHandler);

  inputAddTrek.setAttribute('accept', '.fit, .gpx, .tcx');
  inputAddTrek.addEventListener('change', changeHandlerTrek);

  function changeHandlerTrek(event) {
    if (!event.target.files.length) {
      return;
    }

    const svg = document.getElementById(this.id + '-img');

    const newSpan = document.getElementById('trek-status-text');
    if (newSpan) {
      newSpan.remove();
    }

    const reader = new FileReader();

    reader.onload = (ev) => {
      const fileName = event.target.files[0].name;

      svg.insertAdjacentHTML(
        'beforebegin',
        `<span class="box__status-text" id="trek-status-text">${fileName}</span>`
      );
      svg.classList.add('notEmpty');
      data.fileTrek = ev.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
