export default function filterTrails(cards) {
  // let cardsForFilter = JSON.parse(JSON.stringify(cards));

  let state = JSON.parse(localStorage.getItem('state'));
  let bikeType = JSON.parse(localStorage.getItem('bikeType'));
  // ================================================================
  //первоначальные установки отображение, показывать всё, если в localStorage нет данных
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
  // ================================================================

  let lengthState = state.length;
  let lengthBikeType = bikeType.length;

  // const countState = 4;
  const filteredState = cards.filter((card) => {
    if (
      state.includes('КавМинВоды') &&
      state.includes('Карачаево-Черкессия') &&
      state.includes('Кабардино-Балкария') &&
      state.includes('Северная Осетия')
    ) {
      return cards;
    }
    let compare = true;
    for (let i = 0; i < lengthState; i++) {
      if (card.state === state[i]) {
        return (compare = true);
      } else {
        compare = false;
      }
    }
    compare;
  });

  // const countBikeType = 2;
  const filteredCards = filteredState.filter((card) => {
    if (bikeType.includes('Шоссейный') && bikeType.includes('Горный')) {
      return filteredState;
    }
    let compare = true;
    for (let i = 0; i < lengthBikeType; i++) {
      if (card.bikeType === bikeType[i]) {
        return (compare = true);
      } else {
        compare = false;
      }
    }
    compare;
  });

  return filteredCards;
}
