import { host } from '../utilities/host.js';
import addLags from '../utilities/add-lags.js';
export default function routerFe() {
  const table = document.querySelector('table');
  const blockHandlebars = document.querySelector('.handlebars');

  table.addEventListener('click', async (event) => {
    // event.preventDefault();
    if (event.target.localName !== 'td') {
      return;
    }
    const id = event.target.id;
    const data = await fetch(`${host}/dzhilsu/result/?id=${id}`).then((data) =>
      data.json()
    );

    const dataResult = data[1];
    addLags(dataResult);

    const source = document.querySelector('#tableResultTemplate').innerHTML;
    var template = Handlebars.compile(source);
    const newElement = template({
      list: dataResult,
      eventCity: data[0][0].eventCity,
      eventDate: data[0][0].eventDate,
      eventName: data[0][0].eventName,
    });
    blockHandlebars.innerHTML = newElement;
  });
}
