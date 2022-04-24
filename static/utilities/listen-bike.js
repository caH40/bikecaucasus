export default function listenBikeType(event) {
  if (event.target.checked) {
    //добавление в массив
    let bikeTypeStorage = JSON.parse(localStorage.getItem('bikeType'));
    bikeTypeStorage ??= [];
    bikeTypeStorage.push(event.target.defaultValue);
    localStorage.setItem('bikeType', JSON.stringify(bikeTypeStorage));
  } else {
    //удаление из массива
    let bikeTypeStorage = JSON.parse(localStorage.getItem('bikeType'));
    bikeTypeStorage ??= [];
    bikeTypeStorage = bikeTypeStorage.filter((element) => {
      return element !== event.target.defaultValue;
    });
    localStorage.setItem('bikeType', JSON.stringify(bikeTypeStorage));
  }
  return;
}
