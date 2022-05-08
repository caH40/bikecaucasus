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
    green.addEventListener('click', async () => {
      const dataFromDb = await fetch(`${host}/kudos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
        body: JSON.stringify({ cardId, kudos: true }),
      }).then((data) => data.json());
      console.log(dataFromDb.message);
      if (dataFromDb.kudosGoodQuantity) {
        kudosNumber.innerHTML = prep(dataFromDb.kudosGoodQuantity);
      }
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
      console.log(dataFromDb.message);
      if (dataFromDb.kudosGoodQuantity) {
        kudosNumber.innerHTML = prep(dataFromDb.kudosGoodQuantity);
      }
    });
  },
};
