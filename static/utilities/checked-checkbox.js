export default function () {
  let state = JSON.parse(localStorage.getItem('state'));
  let bikeType = JSON.parse(localStorage.getItem('bikeType'));
  const checkboxes = document.querySelectorAll('[name="checkbox-filter"]');
  checkboxes.forEach((checkbox) => {
    if (
      state.includes(checkbox.defaultValue) ||
      bikeType.includes(checkbox.defaultValue)
    ) {
      checkbox.setAttribute('checked', 'true');
    }
  });
}
