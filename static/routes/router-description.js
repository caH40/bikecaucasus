import myFetch from '../utilities/myfetch.js';
import {
  handlerLike,
  handlerDisLike,
  handlerMessagePopup,
} from '../dynamics/kudosHandler.js';

export default {
  async getKudos(cardId) {
    const blockKudos = document.querySelector('#block-kudos__inner');

    blockKudos.addEventListener('click', async (event) => {
      const mainSelectors =
        event.target.closest('#kudos-green') ||
        event.target.closest('#kudos-red');

      //если нет нужных селекторов то ретурн
      if (!mainSelectors) return;

      let dataFromDb;
      //Like
      if (event.target.closest('#kudos-green')) {
        dataFromDb = await myFetch.fetchPost('/kudos', {
          cardId,
          kudos: true,
        });

        if (dataFromDb.noAuthorization) {
          handlerMessagePopup();
          return;
        }
        handlerLike(dataFromDb);
      }

      //disLike
      if (event.target.closest('#kudos-red')) {
        dataFromDb = await myFetch.fetchPost('/kudos', {
          cardId,
          kudos: false,
        });

        if (dataFromDb.noAuthorization) {
          handlerMessagePopup();
          return;
        }
        handlerDisLike(dataFromDb);
      }
    });
  },
};
