import authPage from '../pages/auth.js';
const body = document.querySelector('body');
const hamb = document.querySelector('#hamb');
const popup = document.querySelector('#popup');
//cloneNode глубокое клонирование
// const menu = document.querySelector('#menu').cloneNode(1);
hamb.addEventListener('click', (e) => {
  e.preventDefault();
  //toggle при первом нажатии добавляется, при втором убирается
  popup.classList.toggle('open');
  renderPopup();

  if (popup.classList.contains('open')) {
    body.style.position = 'fixed';
  } else {
    body.style.position = 'unset';
  }
});

//попап с авторизацией
authPage();

function renderPopup() {
  console.log(menu);
  menu.classList.add('menu__popup');
  popup.appendChild(menu);
}

const dataId = body.getAttribute('data-id-page');
const navItem = document.querySelector(`[data-id-nav="${dataId}"]`);
navItem.classList.add('active-nav');
