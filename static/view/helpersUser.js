export default function () {
  try {
    Handlebars.registerHelper('isAuthorized', function (items, options) {
      if (items.includes('user') || items.includes('moderator') || items.includes('admin')) {
        return true;
      }
      return false;
    });

    Handlebars.registerHelper('isRoleAdmin', function (items, options) {
      if (items.includes('admin')) {
        return true;
      }
      return false;
    });

    Handlebars.registerHelper('isAuthor', function (items, options) {
      const authorUser = localStorage.getItem('userBikeCaucasus');
      if (items === authorUser) {
        return true;
      }
      return false;
    });
  } catch (error) {
    console.log(error);
  }
}
