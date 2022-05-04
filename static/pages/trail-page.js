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
  let result = false;
  if (items.includes('user') || items.includes('admin')) {
    result = true;
  }
  return result;
});

try {
  const dataFormDb = await fetch(`${host}/trail/getcards`, {
    headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
    referrerPolicy: 'unsafe-url',
  }).then((data) => data.json());

  const cards = dataFormDb.card;

  const filteredCards = filterTrails(cards);
  console.log(dataFormDb.user.roles);

  const sortedCards = sortTrail(filteredCards);
  render(
    {
      list: sortedCards.filteredCards,
      userRole: dataFormDb.user.roles,
    },
    '#cardRoutesTemplate'
  );

  checkedCheckbox();

  //установка названия выбранной сортировки на кнопке
  const select = document.querySelector('#select-sort');
  select.options.selectedIndex = sortedCards.selectedIndex;

  routerTrails.router(cards);
} catch (error) {
  console.log(error);
}
