import { avatar } from '../utilities/variables/avatar-newuser.js';
import controller from '../controllers/authController.js';

export default {
  main() {
    const loginBox = document.querySelector('#login__box');
    loginBox.addEventListener('click', controller.modalAuth);
  },

  closeModal() {
    const svgCross = document.querySelector('.svg__cross');
    const popupAuth = document.querySelector('.popup__auth');

    svgCross.onclick = handlerCloseModal;
    function handlerCloseModal() {
      popupAuth.classList.remove('modal-visible');
    }

    //закрытие модального окна при нажатии на esc
    document.addEventListener('keydown', (event) => {
      const keyCode = event.keyCode;
      if (keyCode !== 27 && keyCode !== 13) {
        return;
      }
      if (keyCode === 27) {
        popupAuth.classList.remove('modal-visible');
      }
    });
  },

  menu() {
    const authLogin = document.querySelector('#auth__login');
    const authRegistration = document.querySelector('#auth__registration');

    authLogin.onclick = controller.loginPage;
    authRegistration.onclick = controller.registrationPage;
  },

  button(dataAuth) {
    const button = document.querySelector('#auth__btn');
    button.onclick = handlerButton;

    function handlerButton(event) {
      if (event.target.textContent === 'Вход') {
        controller.sendAuthorization(dataAuth);
      }
      if (event.target.textContent === 'Регистрация') {
        controller.sendRegistration(dataAuth);
      }
      if (event.target.textContent === 'Сброс пароля') {
        controller.resetPassword(dataAuth);
      }
    }
  },
  rememberButton() {
    const rememberButton = document.querySelector('#auth-remember__btn');
    const authTitle = document.querySelector('#auth__title');
    authTitle.innerHTML = '<span class="auth__login" id="auth__login">Сброс пароля</span>';

    rememberButton.onclick = controller.rememberPage;
  },
};
