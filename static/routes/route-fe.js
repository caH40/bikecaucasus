export default function routerFe(data) {
  const table = document.querySelector('#table-events');
  const blockHandlebars = document.querySelector('.handlebars');
  let dataEvent = data[0];
  let dataResult = data[1];

  table.addEventListener('click', (event) => {
    // event.preventDefault();
    if (event.target.localName !== 'a') {
      return;
    }
    const tr = event.target.hash.split('#')[1];
    const dataFiltered = dataResult.filter((el) => el.eventId === tr);
    const source = document.querySelector('#tableResultTemplate').innerHTML;
    var template = Handlebars.compile(source);
    const newElement = template({ list: dataFiltered });
    blockHandlebars.innerHTML = newElement;
  });
}
