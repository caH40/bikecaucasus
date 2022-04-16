import addLags from '../utilities/add-lags.js';
import { render, renderTableResultArrow } from '../view/viewer.js';
import filterColumn from '../utilities/filter-column.js';

export function getEventsTable(data) {
  try {
    //добавление отставаний по времени в таблицу
    const dataResult = data[1];
    addLags(dataResult);
    const dataTemplate = {
      list: dataResult,
      eventCity: data[0][0].eventCity,
      eventDate: data[0][0].eventDate,
      eventName: data[0][0].eventName,
    };
    render(dataTemplate, '#tableResultTemplate');
  } catch (error) {
    console.log(error);
  }
}

export function getResultTable(data, column) {
  try {
    var dataResult = data[1];
    const dataResultFiltered = filterColumn(dataResult, column);
    const dataTemplate = {
      list: dataResultFiltered,
      eventCity: data[0][0].eventCity,
      eventDate: data[0][0].eventDate,
      eventName: data[0][0].eventName,
      segmentStrava: data[0][0].segmentStrava,
    };

    render(dataTemplate, '#tableResultTemplate');
    renderTableResultArrow(column);
  } catch (error) {
    console.log(error);
  }
}

export function getResultUser(data) {
  try {
    for (let i = 0; i < data[1].length; i++) {
      let event = data[0].find((e) => e.eventId === data[1][i].eventId);
      data[1][i] = { ...data[1][i], ...event };
    }
    const dataResult = data[1];
    const dataTemplate = {
      list: dataResult,
      athleteCity: data[1][0].athleteCity,
      athlete: data[1][0].athlete,
      athleteTeam: data[1][0].athleteTeam,
    };

    render(dataTemplate, '#tableUserTemplate');
  } catch (error) {
    console.log(error);
  }
}
