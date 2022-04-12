export default function routerFe() {
  const table = document.querySelector('table');
  const blockHandlebars = document.querySelector('.handlebars');

  table.addEventListener('click', async (event) => {
    // event.preventDefault();
    if (event.target.localName !== 'td') {
      return;
    }

    console.log(event.target.id);
    const id = event.target.id;
    const data = await fetch(
      `http://localhost:5500/dzhilsu/getresult/?id=${id}`
    ).then(
      // const data = await fetch('http://62.113.105.136:80/trail/getcards').then(
      (data) => data.json()
    );

    const dataResult = data[1];

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
