export default function listenState(event) {
  if (event.target.checked) {
    //добавление в массив
    let stateStorage = JSON.parse(localStorage.getItem('state'));
    stateStorage ??= [];
    stateStorage.push(event.target.defaultValue);
    localStorage.setItem('state', JSON.stringify(stateStorage));
  } else {
    //удаление из массива
    let stateStorage = JSON.parse(localStorage.getItem('state'));
    stateStorage ??= [];
    stateStorage = stateStorage.filter((element) => {
      return element !== event.target.defaultValue;
    });
    localStorage.setItem('state', JSON.stringify(stateStorage));
  }
  return;
}
