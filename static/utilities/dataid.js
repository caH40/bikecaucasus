const body = document.querySelector('body');
const hamb = document.querySelector('#hamb');
const popup = document.querySelector('#popup');
//cloneNode глубокое клонирование
const menu = document.querySelector('#menu').cloneNode(1);
hamb.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('click');
  //toggle при первом нажатии добавляется, при втором убирается
  popup.classList.toggle('open');
  renderPopup();
  body.style.position = 'fixed';
});

function renderPopup() {
  menu.classList.add('menu__popup');
  console.log(menu);
  popup.appendChild(menu);
}

const dataId = body.getAttribute('data-id-page');
const navItem = document.querySelector(`[data-id-nav="${dataId}"]`);
navItem.classList.add('active-nav');
