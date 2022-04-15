import { host } from '../utilities/host.js';
import counter from '../utilities/add-count.js';
import routerFe from '../routes/route-fe.js';
import { render } from '../view/viewer.js';

async function dzhilsuEventsPage() {
  try {
    const data = await fetch(`${host}/dzhilsu/results`).then((data) =>
      data.json()
    );
    let dataEvent = data[0];
    let dataResult = data[1];
    counter(dataEvent, dataResult);
    render({ list: dataEvent }, '#tableEventsTemplate');
    routerFe.router(data);
  } catch (error) {
    console.log;
  }
}
dzhilsuEventsPage();
