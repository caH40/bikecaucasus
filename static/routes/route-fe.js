import { host } from '../utilities/host.js';
import addLags from '../utilities/add-lags.js';
import filterColumn from '../utilities/filter-column.js';

const blockHandlebars = document.querySelector('.handlebars');
localStorage.setItem('direction', 'up');
export default {
  router() {
    const tableEvents = document.querySelector('.tableEvents');
    const blockHandlebars = document.querySelector('.handlebars');

    tableEvents.addEventListener('click', async (event) => {
      // event.preventDefault();

      if (event.target.localName !== 'td') {
        return;
      }
      const id = event.target.id;
      const data = await fetch(`${host}/dzhilsu/result/?id=${id}`).then(
        (data) => data.json()
      );

      const dataResult = data[1];
      //добавление отставаний по времени в таблицу
      addLags(dataResult);
      const dataTemplate = {
        list: dataResult,
        eventCity: data[0][0].eventCity,
        eventDate: data[0][0].eventDate,
        eventName: data[0][0].eventName,
      };

      const source = document.querySelector('#tableResultTemplate').innerHTML;
      var template = Handlebars.compile(source);
      const newElement = template(dataTemplate);
      blockHandlebars.innerHTML = newElement;

      this.routerResult(data);
    });
  },
  routerResult(data, column = 'place') {
    var dataResult = data[1];

    const dataResultFiltered = filterColumn(dataResult, column);
    const dataTemplate = {
      list: dataResultFiltered,
      eventCity: data[0][0].eventCity,
      eventDate: data[0][0].eventDate,
      eventName: data[0][0].eventName,
    };
    const source = document.querySelector('#tableResultTemplate').innerHTML;
    var template = Handlebars.compile(source);
    const newElement = template(dataTemplate);
    blockHandlebars.innerHTML = newElement;
    if (column) {
      const thActive = document.getElementById(column);
      thActive.classList.add('active-th');
      const direction = localStorage.getItem('direction');
      if (direction === 'up') {
        thActive.insertAdjacentHTML('beforeend', '<span>&uarr;</span>');
      }
      if (direction === 'down') {
        thActive.insertAdjacentHTML('beforeend', '<span>&darr;</span>');
      }
    }
    const tableResult = document.querySelector('.tableResult');
    tableResult.addEventListener('click', async (event) => {
      if (event.target.localName !== 'th') {
        return;
      }
      const id = event.target.id;
      this.routerResult(data, id);
    });
  },
};
