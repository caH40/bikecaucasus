import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';
import prepData from '../utilities/prep-data.js';
import router from '../routes/router-description.js';

async function descriptionPage() {
  try {
    let id = document.location.search;
    const data = await fetch(`${host}/description/getdata${id}`).then((data) =>
      data.json()
    );
    const textPhoto = prepData.description(data);
    if (window.innerWidth >= 992) {
      render(
        {
          listL: textPhoto[0],
          listR: textPhoto[1],
          card: data.card,
          kudos: data.kudos,
        },
        '#descriptionTemplate'
      );
      router.getKudos(data.card._id);
    } else {
      render(
        {
          list: textPhoto[2],
          card: data.card,
          kudos: data.kudos,
        },
        '#descriptionTemplateMobile'
      );
      router.getKudos();
    }
  } catch (error) {
    console.log(error);
  }
}
descriptionPage();
