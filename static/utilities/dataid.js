const body = document.querySelector('body');
const dataId = body.getAttribute('data-id-page');
const navItem = document.querySelector(`[data-id-nav="${dataId}"]`);
navItem.classList.add('active-nav');
