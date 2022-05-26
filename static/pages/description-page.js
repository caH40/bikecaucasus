import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';
import prepData from '../utilities/prep-data.js';
import router from '../routes/router-description.js';
import helpersUser from '../view/helpersUser.js';

helpersUser();

async function descriptionPage() {
  try {
    //для копирования урла
    let id = document.location.search;
    const data = await fetch(`${host}/description/getdata${id}`, {
      headers: {
        authorization: localStorage.getItem('tokenBikeCaucasus'),
      },
    }).then((data) => data.json());

    // const head = document.querySelector('head');
    // head.insertAdjacentHTML(
    //   'afterbegin',
    // );
    // <meta property="og:description"
    //       content="Маршрут:  ${data.card.nameRoute}. Дистанция ${data.card.distance} км., общий набор высоты ${data.card.ascent} м." />
    //       <meta name="twitter:image" content="${data.descPhoto[0]}" />
    //   <meta property="og:image" content="${data.descPhoto[0]}">
    //   <!--необходим абсолютый путь до изображения --></meta>
    console.log(data);
    const textPhoto = prepData.description(data);
    if (window.innerWidth >= 992) {
      render(
        {
          listL: textPhoto[0],
          listR: textPhoto[1],
          card: data.card,
          kudos: data.kudos,
          listComment: data.card.comments,
          userRole: data.userRole,
        },
        '#descriptionTemplate'
      );
      router.getKudos(data.card._id, data.userRole);
    } else {
      render(
        {
          list: textPhoto[2],
          card: data.card,
          kudos: data.kudos,
          listComment: data.card.comments,
          userRole: data.userRole,
        },
        '#descriptionTemplateMobile'
      );
      router.getKudos(data.card._id, data.userRole);
    }
  } catch (error) {
    console.log(error);
  }
}
descriptionPage();
export default descriptionPage;
