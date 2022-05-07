import { host } from '../utilities/host.js';
import counter from '../utilities/add-count.js';
import routerDzhilsu from '../routes/route-dzhilsu.js';
import { render } from '../view/viewer.js';

async function dzhilsuEventsPage() {
  try {
    const dataFormDb = await fetch(`${host}/dzhilsu/results`, {
      headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
    }).then((data) => data.json());

    let dataEvent = dataFormDb.dataEvent;
    let dataResult = dataFormDb.dataResult;
    counter(dataEvent, dataResult);
    render({ list: dataEvent }, '#tableEventsTemplate');
    routerDzhilsu.router();
  } catch (error) {
    console.log(error);
  }
}
dzhilsuEventsPage();
