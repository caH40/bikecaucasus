export function render(dataTemplate, selectorTarget) {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector(selectorTarget).innerHTML;
  var template = Handlebars.compile(source);
  const newElement = template(dataTemplate);
  blockHandlebars.innerHTML = newElement;
}
export function renderTableResultArrow(column) {
  if (column) {
    const thActive = document.getElementById(column);
    thActive.classList.add('active-th');
    const direction = localStorage.getItem('direction');
    if (direction === 'up') {
      thActive.insertAdjacentHTML('beforeend', '<span>&uarr;</span>');
    }
    if (direction === 'down') {
      thActive.insertAdjacentHTML('beforeend', '<span>&darr;</span>');
    }
  }
}
