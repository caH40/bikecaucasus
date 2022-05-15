import myFetch from '../utilities/myfetch.js';
import descriptionPage from '../pages/description-page.js';
import { render } from '../view/viewer.js';

import {
  handlerLike,
  handlerDisLike,
  handlerMessagePopup,
} from '../dynamics/kudosHandler.js';

export default {
  async getKudos(cardId, userId) {
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
    if (userId) {
      this.comment(cardId);
    }
  },
  async comment(cardId) {
    const commentButton = document.querySelector('#comment__btn');
    const commentArea = document.querySelector('#comment-area');
    const commentAreaStatus = document.querySelector('#comment__area-status');
    this.commentMenu(cardId);
    this.cardMenu(cardId);
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
      }, 3000);
      if (response.noAuthorization) return;
      descriptionPage();
    });
  },
  async commentMenu(cardId) {
    const commentBlock = document.querySelector('#comment__block');

    const commentMenuFill = document.querySelector(
      '#popap-comment__arrow > path'
    );
    const commentMenuItem = document.querySelectorAll('.popap-comment__list');

    commentBlock.addEventListener('click', (event) => {
      //выборка только по стрелке меню
      if (!event.target.matches('#popap-comment__arrow-box')) return;
      const commentId = event.target.attributes[1].value;
      let popapComment;
      let menuItem;
      let svgItem;
      let commentEdit;
      let commentRemove;
      commentMenuItem.forEach((item) => {
        if (item.id === `commentId-${commentId}`) {
          menuItem = document.querySelector(`#commentId-${commentId}`);
          menuItem.classList.toggle('visible');

          svgItem = document.querySelector(
            `#popap-comment__arrow-${commentId}  > path`
          );
          popapComment = document.querySelector(`#popap-comment-${commentId}`);
          svgItem.classList.toggle('fill-arrow');
          commentEdit = document.querySelector(`#edit-${commentId}`);
          commentRemove = document.querySelector(`#remove-${commentId}`);
        }
      });

      const commentEditBlock = document.querySelector(
        `#comment__edit-${commentId}`
      );
      //отслеживание блока попапа
      popapComment.addEventListener('mouseleave', () => {
        menuItem.classList.remove('visible');
        svgItem.classList.remove('fill-arrow');
        return;
      });
      //отслеживание кнопки меню "Редактировать"
      commentEdit.addEventListener('click', async () => {
        commentEditBlock.classList.add('visible');
        menuItem.classList.remove('visible');
        svgItem.classList.remove('fill-arrow');
        return;
      });

      const commentEditButton = document.querySelector(
        `#comment__btn-edit-${commentId}`
      );

      commentEditButton.addEventListener('click', async () => {
        const commentAreaText = document.querySelector(
          `#comment-area-${commentId}`
        ).value;
        const dataFromDb = await myFetch.fetchPost(
          `/description/comment-edit`,
          { commentId, textNew: commentAreaText }
        );
        descriptionPage();
      });
      // ==============================
      //отслеживание кнопки меню "Удалить"
      commentRemove.addEventListener('click', async () => {
        const dataFromDb = await myFetch.fetchPost(
          `/description/comment-remove`,
          { commentId, cardId }
        );
        descriptionPage();
        return;
      });
    });
  },

  async cardMenu(cardId) {
    const cardArrowMenu = document.querySelector('#popap-card__arrow-box');

    const commentMenuFill = document.querySelector(
      '#popap-comment__arrow > path'
    );
    const cardMenuItem = document.querySelector('.popap-card__list');

    let popapCard;
    let svgItem;
    let cardEdit;
    let cardRemove;

    cardArrowMenu.addEventListener('click', (event) => {
      cardMenuItem.classList.add('visible');

      popapCard = document.querySelector(`#popap-card-${cardId}`);

      svgItem = document.querySelector(`#popap-card__arrow-${cardId}  > path`);
      svgItem.classList.toggle('fill-arrow');
      cardEdit = document.querySelector(`#card__edit-${cardId}`);
      cardRemove = document.querySelector(`#card__remove-${cardId}`);

      console.log(popapCard);
      //отслеживание блока попапа
      popapCard.addEventListener('mouseleave', () => {
        cardMenuItem.classList.remove('visible');
        svgItem.classList.remove('fill-arrow');
        return;
      });

      //отслеживание кнопки меню "Редактировать"
      cardEdit.addEventListener('click', async () => {
        cardMenuItem.classList.remove('visible');
        svgItem.classList.remove('fill-arrow');
        const dataFromDb = await myFetch.fetchGet(
          `/description/trail-edit?cardid=${cardId}`
        );
        console.log(dataFromDb);
        render({ data: 'x' }, '#descriptionEditCard');
        return;
      });

      //отслеживание кнопки меню "Удалить"
      cardRemove.addEventListener('click', async () => {
        cardMenuItem.classList.remove('visible');
        svgItem.classList.remove('fill-arrow');

        const result = confirm('Вы уверены?');
        if (!result) return;

        const dataFromDb = await myFetch.fetchPost(
          `/description/trail-remove`,
          {
            cardId,
          }
        );

        const innerCardDescription = document.querySelector('.handlebars');
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.textContent = 'Маршрут удалён!';
        if (dataFromDb.deleted) {
          innerCardDescription.replaceWith(answerElement);
        } else {
          answerElement.textContent = 'Что то пошло не так';
          innerCardDescription.replaceWith(answerElement);
        }
        return;
      });
    });
  },
};
