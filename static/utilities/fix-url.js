export function youtube(url) {
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
export function garmin(url) {
  console.log(url);
  let link = url;
  if (link) {
    link = link.split('/');
    console.log(link);
    link = link[link.length - 1];
    console.log(link);
    return `https://connect.garmin.com/modern/course/embed/${link}`;
  }
}
