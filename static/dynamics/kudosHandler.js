import addPlus from '../utilities/addPlus.js';

//динамика лайка
export function handlerLike(dataFromDb) {
  const kudosNumber = document.querySelector('#block-kudos__number');
  const kudosFillGreen = document.querySelector('#kudos__green-fill-2');
  const kudosFillRed = document.querySelector('#kudos__red-fill-2');
  if (dataFromDb.remove) {
    kudosFillGreen.classList.remove('classLike');
  } else {
    kudosFillGreen.classList.add('classLike');
    kudosFillRed.classList.remove('classDisLike');
  }
  kudosNumber.innerHTML = addPlus(dataFromDb.kudosGoodQuantity);
}

//динамика дизлайка
export function handlerDisLike(dataFromDb) {
  const kudosNumber = document.querySelector('#block-kudos__number');
  const kudosFillGreen = document.querySelector('#kudos__green-fill-2');
  const kudosFillRed = document.querySelector('#kudos__red-fill-2');
  if (dataFromDb.remove) {
    kudosFillRed.classList.remove('classDisLike');
  } else {
    kudosFillGreen.classList.remove('classLike');
    kudosFillRed.classList.add('classDisLike');
  }
  kudosNumber.innerHTML = addPlus(dataFromDb.kudosGoodQuantity);
}
//динамика попап сообщения
export function handlerMessagePopup() {
  const messagePopup = document.querySelector('#message__popup');
  messagePopup.classList.remove('message__popup-invisible');
  messagePopup.classList.add('message__popup-visible');
  setTimeout(() => {
    messagePopup.classList.add('message__popup-invisible');
    messagePopup.classList.remove('message__popup-visible');
  }, 500);
}
