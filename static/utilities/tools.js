import loadImg from './load-img.js';
import { checkEmpty, checkEmptySelect, checkAllInputs } from './check-empty.js';

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
const urlTrekStrava = document.querySelector('#url-trek-strava');
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
checkEmpty(urlTrekStrava, '#url-trek-strava-img');
checkEmpty(urlVideo, '#url-video-img');

export default async function sendData() {
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
    data.urlTrekStrava = urlTrekStrava.value;
    data.author = 'Бережнев А.';

    let checker = true;

    Object.keys(data).forEach((element) => {
      if (data[element] === '') {
        checker = false;
      }
    });
    //попытка исключить из проверки заполнености поля у data.urlVideo
    data.urlVideo = urlVideo.value;

    // if (checker) {
    getFetch('http://62.113.105.136:80/', data);
    // for prod
    // getFetch('http://62.113.105.136:80/', data);
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
    //   console.log('Не все поля заполены');
    // }
  });

  async function getFetch(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error));
    if (response.ok) {
    }
    const answer = await response.json();
    console.log(answer);
  }
}
