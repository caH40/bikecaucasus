import fixUrl from '../utilities/fix-url.js';
async function descriptionPage() {
  const blockHandlebars = document.querySelector('.handlebars');
  const source = document.querySelector('#descriptionTemplate').innerHTML;
  let id = document.location.search;

  const data = await fetch(
    // `http://localhost:5500/description/getdata${id}`
    `http://62.113.105.136:80/description/getdata${id}`
  ).then((data) => data.json());
  data.card.dateCreate = new Date(data.card.id).toLocaleDateString();
  const text = data.card.descriptionArea.split('\n');
  let textPhotoL = [];
  let textPhotoR = [];
  data.card.urlVideo = fixUrl(data.card.urlVideo);
  for (let i = 0; i < text.length; i++) {
    //необходимо сделать проверку на равное количество элементов в массивах текст и фото
    textPhotoL.push({ paragraph: text[i], paragraphPhoto: data.descPhoto[i] });
    i++;
    textPhotoR.push({ paragraph: text[i], paragraphPhoto: data.descPhoto[i] });
  }

  var template = Handlebars.compile(source);
  const newElement = template({
    listL: textPhotoL,
    listR: textPhotoR,
    card: data.card,
  });
  blockHandlebars.innerHTML = newElement;
}
descriptionPage();
