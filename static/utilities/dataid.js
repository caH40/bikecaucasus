import authPage from '../pages/auth.js';
import authIcon from '../utilities/auth-icon.js';

try {
  const body = document.querySelector('body');
  const hamb = document.querySelector('#hamb');
  const popup = document.querySelector('#popup');
  const bar = document.querySelectorAll('.bar');
  //cloneNode глубокое клонирование
  // const menu = document.querySelector('#menu').cloneNode(1);
  hamb.addEventListener('click', (e) => {
    e.preventDefault();
    //toggle при первом нажатии добавляется, при втором убирается
    popup.classList.toggle('open');
    renderPopup();

    if (popup.classList.contains('open')) {
      body.style.position = 'fixed';
      bar[0].classList.add('bar-x1');
      bar[1].classList.add('bar-x2');
      bar[2].classList.add('bar-x3');
    } else {
      body.style.position = 'unset';
      bar[0].classList.remove('bar-x1');
      bar[1].classList.remove('bar-x2');
      bar[2].classList.remove('bar-x3');
    }
  });

  //иконка состояния с авторизации
  authIcon();
  //попап с авторизацией
  authPage();

  function renderPopup() {
    menu.classList.add('menu__popup');
    popup.appendChild(menu);
  }

  const dataId = body.getAttribute('data-id-page');
  const navItem = document.querySelector(`[data-id-nav="${dataId}"]`);
  if (navItem) {
    navItem.classList.add('active-nav');
  }
} catch (error) {
  console.log(error);
}
