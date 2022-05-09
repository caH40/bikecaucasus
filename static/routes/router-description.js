import myFetch from '../utilities/myfetch.js';
import { handlerLike, handlerDisLike } from '../utilities/handlerDynamics.js';

export default {
  async getKudos(cardId) {
    const green = document.querySelector('#kudos-green');
    const red = document.querySelector('#kudos-red');

    //like
    green.addEventListener('click', async () => {
      const dataFromDb = await myFetch.fetchPost('/kudos', {
        cardId,
        kudos: true,
      });

      if (dataFromDb.noAuthorization) {
        return;
      }

      handlerLike(dataFromDb);
    });

    //disLike
    red.addEventListener('click', async () => {
      const dataFromDb = await myFetch.fetchPost('/kudos', {
        cardId,
        kudos: false,
      });

      if (dataFromDb.noAuthorization) {
        return;
      }

      handlerDisLike(dataFromDb);
    });
  },
};
