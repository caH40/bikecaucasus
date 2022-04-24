export default function filterTrails(cards) {
  // let cardsForFilter = JSON.parse(JSON.stringify(cards));

  let state = JSON.parse(localStorage.getItem('state'));
  let bikeType = JSON.parse(localStorage.getItem('bikeType'));
  //первоначальные установки отображение, показывать всё, если в localstorage нет данных
  //если снять все галки, то автоматически проставляются галки??? убирать или нет???
  if (!state || state.length === 0) {
    state = [
      'КавМинВоды',
      'Карачаево-Черкессия',
      'Кабардино-Балкария',
      'Северная Осетия',
    ];
  }
  localStorage.setItem('state', JSON.stringify(state));

  if (!bikeType || bikeType.length === 0) {
    bikeType = ['Шоссейный', 'Горный'];
  }
  localStorage.setItem('bikeType', JSON.stringify(bikeType));

  let filters = {
    state,
    bikeType,
  };
  // console.log(filters);
  let lengthState = filters.state.length;
  let lengthBikeType = filters.bikeType.length;

  const countState = 4;
  const filterState = cards.filter((card) => {
    if (lengthState === countState) {
      return cards;
    }

    let compare = true;

    for (let i = 0; i < lengthState; i++) {
      if (card.state === filters.state[i]) {
        return (compare = true);
      } else {
        compare = false;
      }
    }
    compare;
  });

  const countBikeType = 2;
  const filteredCards = filterState.filter((card) => {
    if (lengthBikeType === countBikeType) {
      return filterState;
    }

    let compare = true;

    for (let i = 0; i < lengthBikeType; i++) {
      if (card.bikeType === filters.bikeType[i]) {
        return (compare = true);
      } else {
        compare = false;
      }
    }
    compare;
  });

  return filteredCards;
}
