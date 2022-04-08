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
export async function descriptionPage(req, res) {
  const id = Number(req.query.id);
  const card = await Card.findOne({ id: id });
  const photo = await Photo.findOne({ id: id });
  console.log(card);
  console.log(photo);
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'description.html'));
}
export function createRoutePage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'static', 'create-route.html'));
}

export async function sendFormCard(req, res) {
  const data = req.body;
  console.log(data);
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
export async function getCardData(req, res) {
  res.status(200);
  const card = await Card.find({});
  res.send(card);
}
export async function getDescription(req, res) {
  res.status(200);
  const card = await Card.find({});
  res.send(card);
}
