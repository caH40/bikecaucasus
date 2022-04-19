import { host } from '../utilities/host.js';
import routerTrails from '../routes/router-trails.js';
import filterNumber from '../utilities/filter-column.js';
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
  console.log(cards);
  //первоначальные установки фильтров
  // const filter = { state: [], bikeType: [] };
  // const sorted = 'distance';
  // cards.sort(() => Math.random() - 0.5);

  render({ list: cards }, '#cardRoutesTemplate');
  routerTrails.router(cards);
} catch (error) {
  console.log(error);
}
