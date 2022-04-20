import { host } from '../utilities/host.js';
import routerTrails from '../routes/router-trails.js';
import filterTrail from '../utilities/filter-trails.js';
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

  const filteredCards = filterTrail(cards);
  render({ list: filteredCards.cards }, '#cardRoutesTemplate');

  const select = document.querySelector('#select-sort');
  select.options.selectedIndex = filteredCards.selectedIndex;

  routerTrails.router(cards);
} catch (error) {
  console.log(error);
}
