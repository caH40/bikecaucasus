import { host } from '../utilities/host.js';

export default async function () {
  const login = document.querySelector('#login');
  const logout = document.querySelector('#logout');
  const profileIcon = document.querySelector('#profile-img');

  //проверяем токен на актуальность
  const response = await fetch(`${host}/auth/check-token`, {
    method: 'POST',
    headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
  });

  const json = await response.json();

  if (json.authorized) {
    login.classList.remove('visible');
    logout.classList.add('visible');
  } else {
    logout.classList.remove('visible');
    login.classList.add('visible');
  }

  const photoProfile = json.photoProfile;

  if (photoProfile) {
    profileIcon.innerHTML = `<img class="profile-link__img" src="${photoProfile}" id="profile__img" />`;
  } else {
    profileIcon.innerHTML = `<img class="profile-link__img" src="../images/avatar.svg" id="profile__img" />`;
  }
}
