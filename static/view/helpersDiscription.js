export default function () {
  Handlebars.registerHelper('typeMTB', function (items, options) {
    if (items === 'Горный') return true;
  });
  Handlebars.registerHelper('typeRoad', function (items, options) {
    if (items === 'Шоссейный') return true;
  });
  Handlebars.registerHelper('stateKMV', function (items, options) {
    if (items === 'КавМинВоды') return true;
  });
  Handlebars.registerHelper('stateKCHR', function (items, options) {
    if (items === 'Карачаево-Черкессия') return true;
  });
  Handlebars.registerHelper('stateKBR', function (items, options) {
    if (items === 'Кабардино-Балкария') return true;
  });
  Handlebars.registerHelper('stateRSO', function (items, options) {
    if (items === 'Северная Осетия') return true;
  });
  Handlebars.registerHelper('stateRA', function (items, options) {
    if (items === 'Адыгея') return true;
  });
}
