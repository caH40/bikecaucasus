import { host } from '../utilities/host.js';

export default async function () {
  const login = document.querySelector('#login');

  //проверяем токен на актуальность
  const response = await fetch(`${host}/auth/check-token`, {
    method: 'POST',
    headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
  });

  const json = await response.json();

  if (json.authorized) {
    login.textContent = 'Выход';
  } else {
    login.textContent = 'Вход';
  }
}
