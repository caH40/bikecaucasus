export function render(dataTemplate, selectorTarget) {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector(selectorTarget).innerHTML;
  var template = Handlebars.compile(source);
  const newElement = template(dataTemplate);
  blockHandlebars.innerHTML = newElement;
}
export function renderTableResultArrow(column) {
  if (column) {
    const thActive = document.getElementById(`${column}-img`);
    const direction = localStorage.getItem('direction');
    if (direction === 'up') {
      thActive.setAttribute('src', './images/ico/arrow-2way-up.svg');
    }
    if (direction === 'down') {
      thActive.setAttribute('src', './images/ico/arrow-2way-down.svg');
    }
  }
}
