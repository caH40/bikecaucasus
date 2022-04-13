import { host } from '../utilities/host.js';
import { getEventsTable, getResultTable } from '../pages/dzhilsu-result.js';

localStorage.setItem('direction', 'up');
export default {
  router() {
    const tableEvents = document.querySelector('.tableEvents');

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
      if (event.target.localName !== 'th') {
        return;
      }
      const id = event.target.id;
      this.routerResult(data, id);
    });
  },
};
