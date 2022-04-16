import { host } from '../utilities/host.js';
import {
  getEventsTable,
  getResultTable,
  getResultUser,
} from '../pages/dzhilsu-result.js';

localStorage.setItem('direction', 'up');
export default {
  router() {
    const tableEvents = document.querySelector('.table');

    tableEvents.addEventListener('click', async (event) => {
      if (event.target.localName !== 'td') {
        return;
      }
      const id = event.target.id;
      const data = await fetch(`${host}/dzhilsu/result/?id=${id}`).then(
        (data) => data.json()
      );
      getEventsTable(data);
      this.routerResult(data);
    });
  },
  routerResult(data, column = 'place') {
    getResultTable(data, column);

    const tableResult = document.querySelector('.tableResult');

    tableResult.addEventListener('click', async (event) => {
      if (event.target.localName === 'th') {
        const id = event.target.id;
        this.routerResult(data, id);
      }
      //поиск всех соревнований, где участвовал атлет
      if (event.target.localName === 'td') {
        const id = event.target.id;

        const data = await fetch(`${host}/dzhilsu/user/?id=${id}`).then(
          (data) => data.json()
        );
        getResultUser(data);
        localStorage.setItem('direction', 'up');
        this.router();
      }
    });
  },

  routerUser() {
    localStorage.setItem('direction', 'up');
    const tableUser = document.querySelector('.tableUser');
    tableUser.addEventListener('click', async (event) => {
      if (event.target.localName !== 'td') {
        return;
      }
      const id = event.target.id;
      const data = await fetch(`${host}/dzhilsu/result/?id=${id}`).then(
        (data) => data.json()
      );
      getEventsTable(data);
      this.routerResult(data);
    });
  },
};
