import Card from '../Model/Card.js';
import path from 'path';

const __dirname = path.resolve();

export function mainPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'index.html'));
}

export function routesPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'routes.html'));
}
export function eventsPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'events.html'));
}
export function galleryPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'gallery.html'));
}
export function dzhilsuPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'dzhilsu.html'));
}
export function descriptionPage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'pages', 'description.html'));
}
export function createRoutePage(req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, 'create-route.html'));
}

// export async function routesBike(req, res) {
//   try {
//     res.status(200).sendFile(path.resolve(__dirname, 'public', 'index.html'));
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getCardData(req, res) {
  res.status(200);
  const card = await Card.find({});
  res.send(card);
}
