import { host } from '../utilities/host.js';
import counter from '../utilities/add-count.js';
import routerFe from '../routes/route-fe.js';
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
    routerFe.router();
  } catch (error) {
    console.log(error);
  }
}
dzhilsuEventsPage();
