import routerFe from '../routes/route-fe.js';

// async function dzhilsuPage() {
//   const blockHandlebars = document.querySelector('.handlebars');
//   const source = document.querySelector('#tableResultTemplate').innerHTML;
//   // const data = await fetch('http://localhost:5500/dzhilsu/getresults').then(
//   const data = await fetch('http://62.113.105.136:80/dzhilsu/getresults').then(
//     (data) => data.json()
//   );
//   console.log(data);
//   var template = Handlebars.compile(source);
//   const newElement = template({ list: data });
//   blockHandlebars.innerHTML = newElement;
// }
// dzhilsuPage();

async function dzhilsuEventsPage() {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector('#tableEventsTemplate').innerHTML;
  const data = await fetch('http://localhost:5500/dzhilsu/getresults').then(
    // const data = await fetch('http://62.113.105.136:80/dzhilsu/getresults').then(
    (data) => data.json()
  );

  let dataEvent = data[0];
  let dataResult = data[1];
  for (let i = 0; i < dataEvent.length; i++) {
    dataEvent[i].tableNumber = i + 1;
    dataEvent[i].quantity = dataResult.filter(
      (x) => x.eventId === dataEvent[i].eventId
    ).length;
  }
  var template = Handlebars.compile(source);
  const newElement = template({ list: dataEvent });
  blockHandlebars.innerHTML = newElement;

  routerFe(data);
}
dzhilsuEventsPage();
