import addPlus from './addPlus.js';

console.log(addPlus);
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
