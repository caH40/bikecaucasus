import { host } from '../utilities/host.js';
Handlebars.registerHelper('type', function (items, options) {
  let result;
  if (items === 'Горный') {
    result = 'card-mtb';
  }
  return result;
});

const blockHandlebars = document.querySelector('.handlebars');
const source = document.querySelector('#cardRoutesTemplate').innerHTML;
const data = await fetch(`${host}/trail/getcards`).then((data) => data.json());
data.sort(() => Math.random() - 0.5);
var template = Handlebars.compile(source);
const newElement = template({ list: data });
blockHandlebars.innerHTML = newElement;
