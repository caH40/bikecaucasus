import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';
Handlebars.registerHelper('type', function (items, options) {
  let result;
  if (items === 'Горный') {
    result = 'card-mtb';
  }
  return result;
});

try {
  const data = await fetch(`${host}/trail/getcards`).then((data) =>
    data.json()
  );
  data.sort(() => Math.random() - 0.5);
  render({ list: data }, '#cardRoutesTemplate');
} catch (error) {
  console.log(error);
}
