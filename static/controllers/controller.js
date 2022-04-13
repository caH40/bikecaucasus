import addLags from '../utilities/add-lags.js';
import { render, renderTableResultArrow } from '../view/viewer.js';
import filterColumn from '../utilities/filter-column.js';

export function getEventsTable(data) {
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
}
export function getResultTable(data, column) {
  var dataResult = data[1];
  const dataResultFiltered = filterColumn(dataResult, column);
  const dataTemplate = {
    list: dataResultFiltered,
    eventCity: data[0][0].eventCity,
    eventDate: data[0][0].eventDate,
    eventName: data[0][0].eventName,
  };

  render(dataTemplate, '#tableResultTemplate');
  renderTableResultArrow(column);
}
