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
      const dataFormDb = await fetch(`${host}/dzhilsu/result/?id=${id}`, {
        headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
      }).then((data) => data.json());
      // console.log('dataFormDb', dataFormDb);
      // getEventsTable(dataFormDb);
      this.routerResult(dataFormDb);
    });
  },
  routerResult(dataFormDb, column = 'place') {
    getResultTable(dataFormDb, column);

    const tableResult = document.querySelector('.tableResult');

    tableResult.addEventListener('click', async (event) => {
      if (event.target.localName === 'th') {
        const id = event.target.id;
        this.routerResult(dataFormDb, id);
      }
      //поиск всех соревнований, где участвовал атлет
      if (event.target.localName === 'td') {
        const id = event.target.id;

        const dataFormDb = await fetch(`${host}/dzhilsu/user/?id=${id}`, {
          headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
        }).then((data) => data.json());

        getResultUser(dataFormDb);
        localStorage.setItem('direction', 'up');
        this.routerUser();
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
      const dataFormDb = await fetch(`${host}/dzhilsu/result/?id=${id}`, {
        headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
      }).then((data) => data.json());
      // console.log('routerUser', dataFormDb);
      getEventsTable(dataFormDb);
      this.routerResult(dataFormDb);
    });
  },
};
