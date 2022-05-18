import { render } from '../view/viewer.js';
import router from '../routes/router-main.js';
import myFetch from '../utilities/myfetch.js';
import prepData from '../utilities/prep-data.js';

Handlebars.registerHelper('authUser', function (items, options) {
  let result = false;
  const authUser = localStorage.getItem('userBikeCaucasus');
  if (items === authUser) {
    result = true;
  }
  return result;
});

export default {
  async main() {
    try {
      const dataFormDb = await myFetch.fetchGet('/main/news');

      dataFormDb.news.forEach((news) => {
        news.date = new Date(Number(news.date)).toLocaleDateString();
      });
      console.log(dataFormDb.news[0]);
      const dataTemplate = { list: dataFormDb.news };
      render(dataTemplate, '#mainTemplate');
    } catch (error) {
      console.log(error);
    }
  },
};
