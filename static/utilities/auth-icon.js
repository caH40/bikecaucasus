import { host } from '../utilities/host.js';

//отрисовка иконки профили и иконки входа
export default async function () {
  const profileIcon = document.querySelector('#profile-img');
  const loginBox = document.querySelector('#login__box');

  const photoProfileLocal = localStorage.getItem('photoProfileBikeCaucasus');
  if (photoProfileLocal) {
    profileIcon.innerHTML = `<img class="profile-link__img" src="${photoProfileLocal}" id="profile__img" />`;
  } else {
    profileIcon.innerHTML = `<img class="profile-link__img" src="../images/avatar.svg" id="profile__img" />`;
  }
  //проверяем токен на актуальность
  const response = await fetch(`${host}/auth/check-token`, {
    method: 'POST',
    headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
  });

  const json = await response.json();
  if (json.authorized) {
    loginBox.innerHTML = `<img class="login__icon" id="logout" src="../images/ico/logout.svg" 
    alt="Выход">`;
    localStorage.setItem('photoProfileBikeCaucasus', json.photoProfile);
  } else {
    loginBox.innerHTML = `<img class="login__icon" id="login" src="images/ico/login.svg" alt="Вход">`;
  }
}
