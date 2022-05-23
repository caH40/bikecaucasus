export default function () {
  try {
    Handlebars.registerHelper('isComment', function (items, options) {
      if (items !== 0) {
        return true;
      } else {
        return false;
      }
    });
  } catch (error) {
    console.log(error);
  }
}
