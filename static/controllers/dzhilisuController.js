import counter from '../utilities/add-count.js';
import { render, renderTableResultArrow } from '../view/viewer.js';
import addLags from '../utilities/add-lags.js';
import filterColumn from '../utilities/filter-column.js';
import router from '../routes/route-dzhilsu.js';
import myFetch from '../utilities/myfetch.js';

Handlebars.registerHelper('authUser', function (items, options) {
  let result = false;
  const authUser = localStorage.getItem('userBikeCaucasus');
  if (items === authUser) {
    result = true;
  }
  return result;
});

export default {
  async main() {
    try {
      const dataFormDb = await myFetch.fetchGet('/dzhilsu/main');
      let dataEvent = dataFormDb.dataEvent;
      let dataResult = dataFormDb.dataResult;
      counter(dataEvent, dataResult);
      render({ list: dataEvent }, '#tableEventsTemplate');
    } catch (error) {
      console.log(error);
    }
  },

  async eventResult(idEvent) {
    try {
      localStorage.setItem('direction', 'up');
      const dataFormDb = await myFetch.fetchGet(
        `/dzhilsu/event-result/?id=${idEvent}`
      );
      let dataResult = dataFormDb.dataResult;
      const dataEvent = dataFormDb.dataEvent;
      dataResult = addLags(dataResult);
      const dataTemplate = {
        list: dataResult,
        eventCity: dataEvent[0].eventCity,
        eventDate: dataEvent[0].eventDate,
        eventName: dataEvent[0].eventName,
      };
      render(dataTemplate, '#tableResultTemplate');
      renderTableResultArrow('place');
    } catch (error) {
      console.log(error);
    }
  },

  async sortResults(idEvent, nameColumn) {
    try {
      const dataFormDb = await myFetch.fetchGet(
        `/dzhilsu/event-result/?id=${idEvent}`
      );
      let dataResult = dataFormDb.dataResult;
      dataResult = addLags(dataResult);
      const dataEvent = dataFormDb.dataEvent;
      const dataUser = dataFormDb.user;
      const dataResultFiltered = filterColumn(dataResult, nameColumn);
      const dataTemplate = {
        list: dataResultFiltered,
        userIdMy: dataUser.id,
        eventCity: dataEvent[0].eventCity,
        eventDate: dataEvent[0].eventDate,
        eventName: dataEvent[0].eventName,
        segmentStrava: dataEvent[0].segmentStrava,
      };
      render(dataTemplate, '#tableResultTemplate');
      renderTableResultArrow(nameColumn);
      router.routerEventResult(idEvent);
    } catch (error) {
      console.log(error);
    }
  },

  async userResults(userId) {
    try {
      const dataFormDb = await myFetch.fetchGet(`/dzhilsu/user/?id=${userId}`);

      const dataResult = dataFormDb.dataResult;
      const dataEvent = dataFormDb.dataEvent;

      for (let i = 0; i < dataResult.length; i++) {
        let event = dataEvent.find((e) => e.eventId === dataResult[i].eventId);
        dataResult[i] = { ...dataResult[i], ...event };
      }
      const dataTemplate = {
        list: dataResult,
        athleteCity: dataResult[0].athleteCity,
        athlete: dataResult[0].athlete,
        athleteTeam: dataResult[0].athleteTeam,
      };
      render(dataTemplate, '#tableUserTemplate');
    } catch (error) {
      console.log(error);
    }
  },
};
