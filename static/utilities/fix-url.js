export default function (url) {
  let link = url;
  if (link) {
    link = link.split('/');
    link = link[link.length - 1];
    if (link.includes('watch?v=')) {
      link = link.split('=');
      link = link[link.length - 1];
    }
    return `https://www.youtube.com/embed/${link}`;
  }
}
