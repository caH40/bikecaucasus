import controller from '../controllers/dzhilisuController.js';

localStorage.setItem('direction', 'up');
export default {
  async routerMain() {
    await controller.main();
    const tableEvents = document.querySelector('.table');
    tableEvents.addEventListener('click', async (event) => {
      if (event.target.localName !== 'td') return;
      const idEvent = event.target.id;
      await controller.eventResult(idEvent);
      this.routerEventResult(idEvent);
    });
  },

  routerEventResult(idRow, column = 'place') {
    const tableResult = document.querySelector('.tableResult');

    tableResult.addEventListener('click', async (event) => {
      if (event.target.localName === 'th') {
        const nameColumn = event.target.id;
        await controller.sortResults(idRow, nameColumn);
      }
      //поиск всех соревнований, где участвовал атлет
      if (event.target.localName === 'td') {
        const userId = event.target.id;
        await controller.userResults(userId);
        this.routerUser();
      }
    });
  },

  routerUser() {
    const tableUser = document.querySelector('.tableUser');
    tableUser.addEventListener('click', async (event) => {
      if (event.target.localName !== 'td') return;
      const idEvent = event.target.id;
      await controller.eventResult(idEvent);
      this.routerEventResult(idEvent);
    });
  },
};
