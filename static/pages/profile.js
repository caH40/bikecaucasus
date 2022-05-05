import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';

async function profile() {
  try {
    const dataFormDb = await fetch(`${host}/profile/info`, {
      headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
    }).then((data) => data.json());

    if (dataFormDb.message) {
      document.querySelector('.handlebars').textContent = dataFormDb.message;
      return;
    }
    const dataProfile = dataFormDb.profile;
    const dataResult = dataFormDb.dataResult;
    const dataEvent = dataFormDb.dataEvent;
    // console.log(dataProfile, dataResult, dataEvent);

    for (let i = 0; i < dataResult.length; i++) {
      let event = dataEvent.find((e) => e.eventId === dataResult[i].eventId);
      dataResult[i] = { ...dataResult[i], ...event };
    }
    const dataTemplate = {
      list: dataResult,
      ...dataProfile,
    };
    render(dataTemplate, '#profileTemplate');
    // routerFe.router();
  } catch (error) {
    console.log(error);
  }
}
profile();
