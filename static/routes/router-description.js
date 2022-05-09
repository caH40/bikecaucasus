import { host } from '../utilities/host.js';

function prep(number) {
  if (number >= 0) {
    return `+${number}`;
  } else {
    return `${number}`;
  }
}

export default {
  async getKudos(cardId) {
    const green = document.querySelector('#kudos-green');
    const kudosNumber = document.querySelector('#block-kudos__number');
    const kudosFillGreen = document.querySelector('#kudos__green-fill-2');
    const kudosFillRed = document.querySelector('#kudos__red-fill-2');
    green.addEventListener('click', async () => {
      const dataFromDb = await fetch(`${host}/kudos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
        body: JSON.stringify({ cardId, kudos: true }),
      }).then((data) => data.json());

      if (dataFromDb.noAuthorization) {
        return;
      }

      if (dataFromDb.remove) {
        kudosFillGreen.classList.remove('classLike');
      } else {
        kudosFillGreen.classList.add('classLike');
        kudosFillRed.classList.remove('classDisLike');
      }
      kudosNumber.innerHTML = prep(dataFromDb.kudosGoodQuantity);
    });

    const red = document.querySelector('#kudos-red');
    red.addEventListener('click', async () => {
      const dataFromDb = await fetch(`${host}/kudos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
        body: JSON.stringify({ cardId, kudos: false }),
      }).then((data) => data.json());

      if (dataFromDb.noAuthorization) {
        return;
      }

      if (dataFromDb.remove) {
        kudosFillRed.classList.remove('classDisLike');
      } else {
        kudosFillGreen.classList.remove('classLike');
        kudosFillRed.classList.add('classDisLike');
      }
      kudosNumber.innerHTML = prep(dataFromDb.kudosGoodQuantity);
    });
  },
};
