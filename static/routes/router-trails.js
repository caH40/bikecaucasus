import { host } from '../utilities/host.js';
import sortTrail from '../utilities/sort-trails.js';
import filterTrails from '../utilities/filter-trails.js';
import listenBikeType from '../utilities/listen-bike.js';
import listenState from '../utilities/listen-state.js';
import checkedCheckbox from '../utilities/checked-checkbox.js';
import { render } from '../view/viewer.js';

export default {
  routeRender(sortedCards, cards, userRole) {
    render(
      { list: sortedCards.filteredCards, userRole },
      '#cardRoutesTemplate'
    );
    checkedCheckbox();
    //установка названия выбранной сортировки на кнопке
    const select = document.querySelector('#select-sort');
    select.options.selectedIndex = sortedCards.selectedIndex;
    this.router(cards, userRole);
  },

  router(cards, userRole) {
    //прослушка сортировки
    const listRoutes = document.querySelector('#select-sort');
    listRoutes.addEventListener('change', (event) => {
      if (!event.target.localName === 'select') {
        return;
      }
      //значение по которому сортируется
      const valueSort = event.target.value;
      const filteredCards = filterTrails(cards);
      const sortedCards = sortTrail(filteredCards, valueSort);
      this.routeRender(sortedCards, cards, userRole);
    });
    //прослушка кнопки фильтра
    const trailFilter = document.querySelector('#trail__filter');
    const trailFormCheckbox = document.querySelector('.trail__form-checkbox');

    trailFilter.addEventListener('click', () => {
      trailFormCheckbox.classList.remove('displayNone');
      //прослушка курсора над модальным окном
      trailFormCheckbox.addEventListener('mouseleave', () => {
        trailFormCheckbox.classList.add('displayNone');
      });
      //прослушка установки галок на чекбоксах
      trailFormCheckbox.addEventListener('change', (event) => {
        const applyButton = document.querySelector('.checkbox__btn');
        applyButton.classList.add('checkbox__btn-changed');
        if (
          event.target.defaultValue === 'Шоссейный' ||
          event.target.defaultValue === 'Горный'
        ) {
          listenBikeType(event);
        } else {
          listenState(event);
        }
      });

      //прослушка кнопки применить
      // const applyButton = document.querySelector('.checkbox__btn');
      const applyButton = document.querySelector('.checkbox__btn');
      applyButton.addEventListener('click', () => {
        applyButton.classList.remove('checkbox__btn-changed');
        const filteredCards = filterTrails(cards);
        const sortedCards = sortTrail(filteredCards);
        this.routeRender(sortedCards, cards, userRole);
      });
    });
  },
  // routerCreateTrail() {
  //   try {
  //     const trailCreate = document.querySelector('#trail-create');
  //     trailCreate.addEventListener('click', async (event) => {
  //       event.preventDefault();
  //       const response = await fetch(`${host}/trail/create`, {
  //         headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
  //       }).then((data) => data.json());
  //
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
