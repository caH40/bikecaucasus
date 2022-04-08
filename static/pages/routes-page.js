export default async function routesPage() {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector('#cardRoutesTemplate').innerHTML;
  const data = await fetch('http://62.113.105.136:80/routes/getcards').then(
    (data) => data.json()
  );
  var template = Handlebars.compile(source);
  const newElement = template({ list: data });
  blockHandlebars.innerHTML = newElement;
}
