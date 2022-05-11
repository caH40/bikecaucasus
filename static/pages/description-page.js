import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';
import prepData from '../utilities/prep-data.js';
import router from '../routes/router-description.js';

Handlebars.registerHelper('isAuthor', function (items, options) {
  let result = false;
  const authUser = localStorage.getItem('userBikeCaucasus');
  if (items === authUser) {
    result = true;
  }
  return result;
});
Handlebars.registerHelper('isAuth', function (items, options) {
  if (items) {
    return true;
  } else {
    return false;
  }
});

async function descriptionPage() {
  try {
    let id = document.location.search;
    const data = await fetch(`${host}/description/getdata${id}`, {
      headers: {
        authorization: localStorage.getItem('tokenBikeCaucasus'),
      },
    }).then((data) => data.json());

    const textPhoto = prepData.description(data);

    if (window.innerWidth >= 992) {
      render(
        {
          listL: textPhoto[0],
          listR: textPhoto[1],
          card: data.card,
          kudos: data.kudos,
          listComment: data.card.comments,
          userId: data.user.id,
          userRole: data.user.roles,
        },
        '#descriptionTemplate'
      );
      router.getKudos(data.card._id, data.user.id);
    } else {
      render(
        {
          list: textPhoto[2],
          card: data.card,
          kudos: data.kudos,
          listComment: data.card.comments,
          userId: data.user.id,
          userRole: data.user.roles,
        },
        '#descriptionTemplateMobile'
      );
      router.getKudos(data.card._id, data.user.id);
    }
  } catch (error) {
    console.log(error);
  }
}
descriptionPage();
export default descriptionPage;
