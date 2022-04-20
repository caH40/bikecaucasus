export default function filterTrail(cards, valueSort, filter) {
  let elementSort;
  let selectedIndex;
  if (!localStorage.getItem('directionTrails')) {
    localStorage.setItem('directionTrails', 'distanceRandom');
  }
  valueSort ??= localStorage.getItem('directionTrails');

  if (valueSort === 'random' || valueSort === '') {
    localStorage.setItem('directionTrails', 'distanceRandom');
    selectedIndex = 0;
  }
  if (valueSort === 'distanceUp') {
    elementSort = 'distance';
    localStorage.setItem('directionTrails', 'distanceUp');
    selectedIndex = 1;
  }
  if (valueSort === 'distanceDown') {
    elementSort = 'distance';
    localStorage.setItem('directionTrails', 'distanceDown');
    selectedIndex = 2;
  }
  if (valueSort === 'ascentUp') {
    elementSort = 'ascent';
    localStorage.setItem('directionTrails', 'ascentUp');
    selectedIndex = 3;
  }
  if (valueSort === 'ascentDown') {
    elementSort = 'ascent';
    localStorage.setItem('directionTrails', 'ascentDown');
    selectedIndex = 4;
  }

  // cards = cards.filter((element) => element.state === filter);
  const directionTrails = localStorage.getItem('directionTrails');
  if (directionTrails.includes('Up')) {
    cards = cards.sort((a, b) => a[elementSort] - b[elementSort]);
  } else if (directionTrails.includes('Down')) {
    cards = cards.sort((a, b) => b[elementSort] - a[elementSort]);
  } else {
    cards = cards.sort(() => Math.random() - 0.5);
  }
  return { cards, selectedIndex };
}
