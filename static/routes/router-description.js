import myFetch from '../utilities/myfetch.js';
import descriptionPage from '../pages/description-page.js';

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
    this.comment(cardId);
  },
  async comment(cardId) {
    const commentButton = document.querySelector('#comment__btn');
    const commentArea = document.querySelector('#comment-area');
    const commentAreaStatus = document.querySelector('#comment__area-status');

    commentButton.addEventListener('click', async () => {
      const text = commentArea.value;
      if (text.length < 30) {
        return (commentAreaStatus.textContent =
          'Комментарий не может быть пустным. Необходимо написать не менее 30 символов.');
      } else {
        commentArea.value = '';
      }
      const date = new Date().getTime();
      const response = await myFetch.fetchPost('/description/comment', {
        cardId,
        text,
        date,
      });
      commentAreaStatus.textContent = response.message;
      setTimeout(() => {
        commentAreaStatus.textContent = '';
      }, 2000);
      descriptionPage();
    });
  },
};
