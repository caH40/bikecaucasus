import { host } from '../utilities/host.js';
import routerTrails from '../routes/router-trails.js';
import sortTrail from '../utilities/sort-trails.js';
import filterTrails from '../utilities/filter-trails.js';
import checkedCheckbox from '../utilities/checked-checkbox.js';
import { render } from '../view/viewer.js';

Handlebars.registerHelper('type', function (items, options) {
  let result;
  if (items === 'Горный') {
    result = 'card-mtb';
  }
  return result;
});
Handlebars.registerHelper('roleUser', function (items, options) {
  if (!items) {
    return;
  }
  let result = false;
  if (items.includes('user') || items.includes('admin')) {
    result = true;
  }
  return result;
});

try {
  const dataFormDb = await fetch(`${host}/trail/getcards`, {
    headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
  }).then((data) => data.json());

  const cards = dataFormDb.cards;
  //добавление кудосов и просмотров в соответствующие карточки
  cards.forEach((card) => {
    let likeQuantity = card.kudoses.usersIdLike.length;
    let disLikeQuantity = card.kudoses.usersIdDisLike.length;
    card.kudos = likeQuantity - disLikeQuantity;
  });

  const userRole = dataFormDb.user.roles;
  const filteredCards = filterTrails(cards);
  const sortedCards = sortTrail(filteredCards);
  render(
    {
      list: sortedCards.filteredCards,
      userRole,
    },
    '#cardRoutesTemplate'
  );

  checkedCheckbox();

  //установка названия выбранной сортировки на кнопке
  const select = document.querySelector('#select-sort');
  select.options.selectedIndex = sortedCards.selectedIndex;

  routerTrails.router(cards, userRole);
} catch (error) {
  console.log(error);
}
