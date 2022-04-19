import filterTrail from '../utilities/filter-trails.js';
import { render } from '../view/viewer.js';

localStorage.setItem('directionTrails', 'up');

export default {
  router(cards) {
    const listRoutes = document.querySelector('.list__routes');

    listRoutes.addEventListener('change', (event) => {
      if (!event.target.localName === 'select') {
        return;
      }

      const valueSort = event.target.value;
      let elementSort;
      let nameDirection;
      let selectedIndex;

      if (valueSort === 'distanceUp') {
        elementSort = 'distance';
        nameDirection = 'directionDistance';
        localStorage.setItem(nameDirection, 'up');
        selectedIndex = 1;
      }
      if (valueSort === 'distanceDown') {
        elementSort = 'distance';
        nameDirection = 'directionDistance';
        localStorage.setItem(nameDirection, 'down');
        selectedIndex = 2;
      }
      if (valueSort === 'ascentUp') {
        elementSort = 'ascent';
        nameDirection = 'directionAscent';
        localStorage.setItem(nameDirection, 'up');
        selectedIndex = 3;
      }
      if (valueSort === 'ascentDown') {
        elementSort = 'ascent';
        nameDirection = 'directionAscent';
        localStorage.setItem(nameDirection, 'down');
        selectedIndex = 4;
      }

      const filter = 'Кабардино-Балкария';
      const filteredCards = filterTrail(
        cards,
        elementSort,
        nameDirection,
        filter
      );
      render({ list: cards }, '#cardRoutesTemplate');
      const select = document.querySelector('#select-sort');
      select.options.selectedIndex = selectedIndex;
      console.log(localStorage);

      this.router(filteredCards);
    });
  },
};
