import myFetch from '../utilities/myfetch.js';
import loadImgEdit from '../utilities/load-img-edit.js';
import {
  checkEmpty,
  checkEmptySelect,
  checkAllInputs,
} from '../utilities/check-empty.js';

export default function (cardPhotoDb, descPhotoDb, card) {
  const svgAll = document.querySelectorAll('.box__checkmark');

  const form = document.querySelector('#card-edit__form');
  const divBoxImageCard = document.querySelector('#input__card-photo-images');
  const divBoxImageDesc = document.querySelector('#input__desc-photo-images');

  const nameRoute = document.querySelector('#name-route');
  const state = document.querySelector('#state');
  const bikeType = document.querySelector('#bike-type');
  const start = document.querySelector('#start');
  const turn = document.querySelector('#turn');
  const finish = document.querySelector('#finish');
  const distance = document.querySelector('#distance');
  const ascent = document.querySelector('#ascent');
  const descriptionArea = document.querySelector('#description-area');
  const authorPhoto = document.querySelector('#url-photo-author');
  const urlTrekGConnect = document.querySelector('#url-trek-gconnect');
  const urlVideo = document.querySelector('#url-video');
  var data = {};
  // data.descPhoto = [];

  // загрузка изображений
  loadImgEdit(cardPhotoDb, descPhotoDb, data);

  checkAllInputs();

  //контроль заполнения полей данных
  checkEmpty(nameRoute, '#name-route-img');
  checkEmptySelect(state, '#state-img');
  checkEmptySelect(bikeType, '#bike-type-img');
  checkEmpty(start, '#start-img');
  checkEmpty(turn, '#turn-img');
  checkEmpty(finish, '#finish-img');
  checkEmpty(distance, '#distance-img');
  checkEmpty(ascent, '#ascent-img');
  checkEmpty(descriptionArea, '#description-area-img');
  checkEmpty(authorPhoto, '#url-desc-photo-author-img');
  checkEmpty(urlTrekGConnect, '#url-trek-gconnect-img');
  checkEmpty(urlVideo, '#url-video-img');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    data.cardIdOld = card._id;
    data.nameRoute = nameRoute.value;
    data.state = state.value;
    data.bikeType = bikeType.value;
    data.start = start.value;
    data.turn = turn.value;
    data.finish = finish.value;
    data.distance = distance.value;
    data.ascent = ascent.value;
    data.descriptionArea = descriptionArea.value;
    data.urlTrekGConnect = urlTrekGConnect.value;
    data.date = new Date().getTime();
    //сохранение фотографий из элементов img
    data.cardPhoto =
      divBoxImageCard.querySelector('#photo-desc-img').currentSrc;

    data.descPhoto ??= [];
    let arrDescPhoto = divBoxImageDesc.querySelectorAll('#photo-desc-img');
    arrDescPhoto.forEach((element) => {
      data.descPhoto.push(element.currentSrc);
    });

    let checker = true;

    Object.keys(data).forEach((element) => {
      if (data[element] === '') {
        checker = false;
      }
    });
    //попытка исключить из проверки заполненности поля у data.urlVideo
    data.urlVideo = urlVideo.value;
    data.authorPhoto = authorPhoto.value;

    if (checker) {
      //отправка файла с треком

      if (data.fileTrek) {
        myFetch.fetchPostFile(
          `/uploadTrek?trekname=${card.fileTrekName}`,
          data.fileTrek
        );
        delete data.fileTrek;
      }

      const dataFromDb = await myFetch.fetchPost('/trail-edited', data);
      //формирование сообщения о выполнении, добавить карточку только что созданного маршрута
      //что бы сразу оценить её и проверить на ошибки
      const innerCardEdit = document.querySelector('.inner__card-edit');
      const answerElement = document.createElement('div');
      answerElement.classList.add('answer');
      answerElement.textContent = 'Маршрут сохранён!';

      //модальное окно о сохранении маршрута
      if (dataFromDb.dispatched) {
        innerCardEdit.replaceWith(answerElement);
      } else {
        answerElement.textContent = dataFromDb.message;
        innerCardEdit.replaceWith(answerElement);
      }

      event.target.reset();
      const spanTrek = document.getElementById('trek-status-text');
      if (spanTrek) {
        spanTrek.textContent = '';
      }
      divBoxImageCard.innerHTML = '';
      divBoxImageDesc.innerHTML = '';
      svgAll.forEach((element) => {
        element.classList.remove('notEmpty');
      });
    } else {
      console.log('Не все поля заполнены');
    }
  });
}
