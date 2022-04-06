async function start() {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector('#cardRoutesTemplate').innerHTML;
  const data = await fetch('http://localhost:5500/routes/getcards').then(
    (data) => data.json()
  );
  console.log(data);
  var template = Handlebars.compile(source);
  const newElement = template({ list: data });
  blockHandlebars.innerHTML = newElement;
}

start();
