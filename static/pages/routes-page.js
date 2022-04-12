export default async function routesPage() {
  Handlebars.registerHelper('type', function (items, options) {
    let result;
    if (items === 'Горный') {
      result = 'card-mtb';
    }
    return result;
  });

  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector('#cardRoutesTemplate').innerHTML;
  // const data = await fetch('http://localhost:5500/routes/getcards').then(
  const data = await fetch('http://62.113.105.136:80/routes/getcards').then(
    (data) => data.json()
  );
  data.sort(() => Math.random() - 0.5);
  var template = Handlebars.compile(source);
  const newElement = template({ list: data });
  blockHandlebars.innerHTML = newElement;
}
