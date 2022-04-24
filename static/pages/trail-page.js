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

try {
  const cards = await fetch(`${host}/trail/getcards`, {
    referrerPolicy: 'unsafe-url',
  }).then((data) => data.json());

  const filteredCards = filterTrails(cards);
  // console.log(filteredCards);

  const sortedCards = sortTrail(filteredCards);
  render({ list: sortedCards.filteredCards }, '#cardRoutesTemplate');

  checkedCheckbox();
  // console.log(new Date().toLocaleTimeString(), 'рендер из trail-page');

  //установка названия выбранной сортировки на кнопке
  const select = document.querySelector('#select-sort');
  select.options.selectedIndex = sortedCards.selectedIndex;

  routerTrails.router(cards);
} catch (error) {
  console.log(error);
}
