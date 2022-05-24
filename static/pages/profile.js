import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';
import modalAnswer from '../utilities/modal-answer.js';
import routerProfile from '../routes/router-profile.js';

Handlebars.registerHelper('male', function (items, options) {
  if (items === 'мужской') {
    return true;
  } else {
    return false;
  }
});
Handlebars.registerHelper('female', function (items, options) {
  if (items === 'женский') {
    return true;
  } else {
    return false;
  }
});

async function profile() {
  try {
    const response = await fetch(`${host}/profile/info`, {
      headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
    });
    const dataFromDb = await response.json();
    // console.log(dataFromDb);
    if (!response.ok) {
      modalAnswer(dataFromDb.message, 1500, false);
      return;
    }
    const dataProfile = dataFromDb.profile;
    const dataResult = dataFromDb.dataResult;
    const dataEvent = dataFromDb.dataEvent;

    for (let i = 0; i < dataResult.length; i++) {
      let event = dataEvent.find((e) => e.eventId === dataResult[i].eventId);
      dataResult[i] = { ...dataResult[i], ...event };
    }
    const dataTemplate = {
      list: dataResult,
      ...dataProfile,
    };

    render(dataTemplate, '#profileTemplate');

    routerProfile.router();
  } catch (error) {
    console.log(error);
  }
}
profile();
