import addLags from '../utilities/add-lags.js';
import { render, renderTableResultArrow } from '../view/viewer.js';
import filterColumn from '../utilities/filter-column.js';

Handlebars.registerHelper('authUser', function (items, options) {
  let result = false;
  const authUser = localStorage.getItem('userBikeCaucasus');
  if (items === authUser) {
    result = true;
  }
  return result;
});

export function getEventsTable(dataFormDb) {
  try {
    //добавление отставаний по времени в таблицу
    // dataFormDb;
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
  } catch (error) {
    console.log(error);
  }
}

export function getResultTable(dataFormDb, column) {
  try {
    let dataResult = dataFormDb.dataResult;
    dataResult = addLags(dataResult);
    const dataEvent = dataFormDb.dataEvent;
    const dataUser = dataFormDb.user;

    const dataResultFiltered = filterColumn(dataResult, column);

    const dataTemplate = {
      list: dataResultFiltered,
      userIdMy: dataUser.id,
      eventCity: dataEvent[0].eventCity,
      eventDate: dataEvent[0].eventDate,
      eventName: dataEvent[0].eventName,
      segmentStrava: dataEvent[0].segmentStrava,
    };

    render(dataTemplate, '#tableResultTemplate');
    renderTableResultArrow(column);
  } catch (error) {
    console.log(error);
  }
}

export function getResultUser(dataFormDb) {
  try {
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
}
