export default function () {
  let state = JSON.parse(localStorage.getItem('state'));
  let bikeType = JSON.parse(localStorage.getItem('bikeType'));

  const checkboxes = document.querySelectorAll('[name="checkbox-filter"]');
  //установка галок в чекбоксах для значений из localStorage
  checkboxes.forEach((checkbox) => {
    if (
      state.includes(checkbox.defaultValue) ||
      bikeType.includes(checkbox.defaultValue)
    ) {
      checkbox.setAttribute('checked', 'true');
    }
  });
  //подсвечивание лампочки фильтров
  const flashlight = document.querySelector('.trail__flashlight');
  if (state.length === 4 && bikeType.length === 2) {
    flashlight.classList.add('trail__flashlight-off');
  } else {
    flashlight.classList.add('trail__flashlight-on');
  }
}
