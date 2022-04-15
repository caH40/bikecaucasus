import { host } from '../utilities/host.js';
import { youtube, garmin } from '../utilities/fix-url.js';
import { render } from '../view/viewer.js';

async function descriptionPage() {
  try {
    let id = document.location.search;
    const data = await fetch(`${host}/description/getdata${id}`).then((data) =>
      data.json()
    );
    console.log('dataGetDB', data);
    data.card.dateCreate = new Date(data.card.id).toLocaleDateString();
    const text = data.card.descriptionArea.split('\n');
    let textPhotoL = [];
    let textPhotoR = [];
    data.card.urlVideo = youtube(data.card.urlVideo);
    data.card.urlTrekGConnectEmber = garmin(data.card.urlTrekGConnect);

    for (let i = 0; i < text.length; i++) {
      //необходимо сделать проверку на равное количество элементов в массивах текст и фото
      textPhotoL.push({
        paragraph: text[i],
        paragraphPhoto: data.descPhoto[i],
      });
      i++;
      textPhotoR.push({
        paragraph: text[i],
        paragraphPhoto: data.descPhoto[i],
      });
    }
    render(
      {
        listL: textPhotoL,
        listR: textPhotoR,
        card: data.card,
      },
      '#descriptionTemplate'
    );
  } catch (error) {
    console.log(error);
  }
}
descriptionPage();
