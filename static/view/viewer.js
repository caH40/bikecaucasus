export default function () {
  var template = Handlebars.compile(source);
  const newElement = template({ list: dataEvent });
  blockHandlebars.innerHTML = newElement;
}
