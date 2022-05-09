import myFetch from '../utilities/myfetch.js';
import {
  handlerLike,
  handlerDisLike,
  handlerMessagePopup,
} from '../dynamics/kudosHandler.js';

export default {
  async getKudos(cardId) {
    const blockKudos = document.querySelector('#block-kudos__inner');

    //like
    blockKudos.addEventListener('click', async (event) => {
      const idSelector = event.target.id;

      //если нет нужных селекторов то ретурн
      if (!['kudos-green', 'kudos-red'].includes(idSelector)) {
        return;
      }

      let dataFromDb;
      //Like
      if (idSelector === 'kudos-green') {
        dataFromDb = await myFetch.fetchPost('/kudos', {
          cardId,
          kudos: true,
        });
      }
      //disLike
      if (idSelector === 'kudos-red') {
        dataFromDb = await myFetch.fetchPost('/kudos', {
          cardId,
          kudos: false,
        });
      }

      if (dataFromDb.noAuthorization) {
        handlerMessagePopup();
        return;
      }
      handlerLike(dataFromDb);
    });
  },
};
