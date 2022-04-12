import { host } from '../utilities/host.js';
import counter from '../utilities/add-count.js';
import routerFe from '../routes/route-fe.js';

async function dzhilsuEventsPage() {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector('#tableEventsTemplate').innerHTML;
  const data = await fetch(`${host}/dzhilsu/results`).then((data) =>
    data.json()
  );

  let dataEvent = data[0];
  let dataResult = data[1];
  counter(dataEvent, dataResult);

  var template = Handlebars.compile(source);
  const newElement = template({ list: dataEvent });
  blockHandlebars.innerHTML = newElement;

  routerFe(data);
}
dzhilsuEventsPage();
