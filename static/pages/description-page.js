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
    //   `
    //   <meta property="og:locale=" ru_RU" />
    //   <meta property="og:title" content="Проверка работы" />
    //   <meta property="og:type" content="website" />
    //   <meta property="og:description" content="Маршрут2" />
    //   <meta property="og:image" content="https://funart.pro/uploads/posts/2021-07/1626126282_4-funart-pro-p-tolstii-morskoi-kotik-zhivotnie-krasivo-fo-6.jpg" />
    //   `
    // );
    //   <meta property="og:locale=" ru_RU" />
    //   <meta property="og:title" content="Bike-Caucasus" />
    //   <meta property="og:type" content="website" />
    //   <meta property="og:description"
    //   content="Маршрут:  ${data.card.nameRoute}. Дистанция ${data.card.distance} км., общий набор высоты ${data.card.ascent} м." />
    // <meta property="og:image" content="https://funart.pro/uploads/posts/2021-07/1626126282_4-funart-pro-p-tolstii-morskoi-kotik-zhivotnie-krasivo-fo-6.jpg">

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
