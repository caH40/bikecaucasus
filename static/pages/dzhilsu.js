import { host } from '../utilities/host.js';
import time from '../utilities/time.js';
import routerFe from '../routes/route-fe.js';

async function dzhilsuEventsPage() {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector('#tableEventsTemplate').innerHTML;
  const data = await fetch(`${host}/dzhilsu/getresults`).then((data) =>
    data.json()
  );
  const times = '03:2:21';
  const x = time.timeToSecondes(times);
  let dataEvent = data[0];
  let dataResult = data[1];
  for (let i = 0; i < dataEvent.length; i++) {
    dataEvent[i].tableNumber = i + 1;
    dataEvent[i].quantity = dataResult.filter(
      (x) => x.eventId === dataEvent[i].eventId
    ).length;
  }
  var template = Handlebars.compile(source);
  const newElement = template({ list: dataEvent });
  blockHandlebars.innerHTML = newElement;

  routerFe(data);
}
dzhilsuEventsPage();
