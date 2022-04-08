import Card from '../Model/Card.js';
import Photo from '../Model/Photo.js';
import path from 'path';

const __dirname = path.resolve();

export function mainPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
}

export function routesPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'routes.html'));
}
export function eventsPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'events.html'));
}
export function galleryPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'gallery.html'));
}
export function dzhilsuPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'dzhilsu.html'));
}
//cтраница описания маршрута
export async function descriptionPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'description.html'));
}
//страница создания маршрута
export function createRoutePage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'create-route.html'));
}

//сохранение данных маршрута в Монго
export async function sendFormCard(req, res) {
  const data = req.body;
  const id = new Date().getTime();
  const photo = await Photo({
    id,
    nameRoute: data.nameRoute,
    state: data.state,
    descPhoto: data.descPhoto,
  });
  photo.save();
  delete data.descPhoto;
  data.id = id;
  const card = await Card(data);
  card.save();
  res.status(201);
}
// получение всех карточек маршрутов из Монго
export async function getCardData(req, res) {
  res.status(200);
  const card = await Card.find({});
  res.send(card);
}
// получение данных конкретного маршрута для формирования страницы description
export async function getDescriptionData(req, res) {
  res.status(200);
  const id = req.query.id;
  const card = await Card.findOne({ id: id });
  const photo = await Photo.findOne({ id: id });
  const data = {
    descPhoto: photo.descPhoto,
    card,
  };
  res.send(data);
}
