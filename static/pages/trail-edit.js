import myFetch from '../utilities/myfetch.js';
import { host } from '../utilities/host.js';
import loadImg from '../utilities/load-img.js';
import pageUp from '../utilities/pageup.js';
import {
  checkEmpty,
  checkEmptySelect,
  checkAllInputs,
} from '../utilities/check-empty.js';

// const dataFromDbForEdit = myFetch.fetchGet('/description/getdata');

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
data.descPhoto = [];

// загрузка изображений
loadImg(data);

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

export async function sendData() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

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
    data.author = 'Бережнев А.';
    data.date = new Date().getTime();

    let checker = true;

    Object.keys(data).forEach((element) => {
      if (data[element] === '') {
        checker = false;
      }
    });
    //попытка исключить из проверки заполненности поля у data.urlVideo
    data.urlVideo = urlVideo.value;
    data.authorPhoto = authorPhoto.value;

    // if (checker) {
    postAxios(data.fileTrek);
    delete data.fileTrek;
    getFetch(host, data);
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
    // } else {
    //   console.log('Не все поля заполнены');
    // }
  });

  async function postAxios(file) {
    try {
      await axios.post('/uploadTrek', file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getFetch(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
        body: JSON.stringify(data),
      }).catch((error) => console.log(error));
      if (response.ok) {
      }
      const answer = await response.json();
      //формирование сообщения о выполнении, добавить карточку только что созданного маршрута
      //что бы сразу оценить её и проверить на ошибки
      const innerCardEdit = document.querySelector('.inner__card-edit');
      const answerElement = document.createElement('div');
      answerElement.classList.add('answer');
      answerElement.textContent = 'Маршрут сохранён!';
      if (answer.dispatched) {
        innerCardEdit.replaceWith(answerElement);
        pageUp();
      } else {
        answerElement.textContent = 'Произошла ОШИБКА!';
        innerCardEdit.replaceWith(answerElement);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
sendData();
