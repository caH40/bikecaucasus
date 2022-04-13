import { host } from '../utilities/host.js';
import fixUrl from '../utilities/fix-url.js';
import { render } from '../view/viewer.js';

async function descriptionPage() {
  let id = document.location.search;
  const data = await fetch(`${host}/description/getdata${id}`).then((data) =>
    data.json()
  );
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
  render(
    {
      listL: textPhotoL,
      listR: textPhotoR,
      card: data.card,
    },
    '#descriptionTemplate'
  );
}
descriptionPage();
