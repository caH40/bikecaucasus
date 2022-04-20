import filterTrail from '../utilities/filter-trails.js';
import { render } from '../view/viewer.js';

export default {
  router(cards) {
    const listRoutes = document.querySelector('.list__routes');

    listRoutes.addEventListener('change', (event) => {
      if (!event.target.localName === 'select') {
        return;
      }
      const valueSort = event.target.value;

      const filter = 'Кабардино-Балкария';
      const filteredCards = filterTrail(cards, valueSort, filter);

      render({ list: filteredCards.cards }, '#cardRoutesTemplate');

      const select = document.querySelector('#select-sort');
      select.options.selectedIndex = filteredCards.selectedIndex;
      console.log(localStorage);

      this.router(filteredCards.cards);
    });
  },
};
