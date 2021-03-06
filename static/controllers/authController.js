import router from '../routes/router-auth.js';
import myFetch from '../utilities/myfetch.js';
import { login, registration, remember, createNewPassword, saved } from '../view/auth-html.js';
import authIcon from '../utilities/auth-icon.js';
import validation from '../utilities/auth-validation.js';
import modalAnswer from '../utilities/modal-answer.js';
import { avatar } from '../utilities/variables/avatar-newuser.js';

const popupAuth = document.querySelector('.popup__auth');
const authTemplate = document.querySelector('#auth__template');

export default {
  async modalAuth(event) {
    //включение модального окна
    if (event.target.id === 'logout') {
      localStorage.removeItem('tokenBikeCaucasus');
      localStorage.removeItem('userBikeCaucasus');
      localStorage.removeItem('photoProfileBikeCaucasus');

      await authIcon();
      modalAnswer('Выход...Возвращайтесь!', 1000);
      return;
    }
    if (event.target.id === 'login') {
      popupAuth.classList.add('modal-visible');
      //отрисовка меню Входа
      authTemplate.innerHTML = login;
      const validatorState = validation();
      router.button(validatorState);
      router.closeModal();
      router.menu();
      // return;
    }
  },

  loginPage() {
    authTemplate.innerHTML = login;

    const authLogin = document.querySelector('#auth__login');
    const authRegistration = document.querySelector('#auth__registration');

    authRegistration.classList.add('auth__gray');
    authLogin.classList.remove('auth__gray');
    const validatorState = validation();
    router.button(validatorState);
    router.closeModal();
  },

  registrationPage() {
    authTemplate.innerHTML = registration;

    const authLogin = document.querySelector('#auth__login');
    const authRegistration = document.querySelector('#auth__registration');

    authRegistration.classList.remove('auth__gray');
    authLogin.classList.add('auth__gray');
    const dataAuth = validation();
    router.button(dataAuth);
    router.closeModal();
  },

  rememberPage() {
    authTemplate.innerHTML = remember;
    const dataAuth = validation();
    router.button(dataAuth);
    router.closeModal();
  },

  async resetPassword(dataAuth) {
    const validationAll = document.querySelector('#validation__all');
    const authBlock = document.querySelector('#auth__block');
    const email = dataAuth.user.email;
    console.log(email);
    const isCorrectEmail = dataAuth.validatorState.email;
    if (isCorrectEmail) {
      const dataFromDb = await myFetch.fetchPost('/auth/password-reset', { email });

      if (dataFromDb.isEmailCorrect) {
        modalAnswer(dataFromDb.message, 3000);
        popupAuth.classList.add('invisible');
      } else {
        validationAll.style.color = 'red';
        validationAll.textContent = dataFromDb.message;
      }
    }
  },

  async sendAuthorization(dataAuth) {
    const validationAll = document.querySelector('#validation__all');
    const rememberBox = document.querySelector('#remember-box');
    const button = document.querySelector('#auth__btn');
    //блок авторизации
    //проверка валидности всех полей
    const isCorrectNickname = dataAuth.validatorState.nickname;
    const isCorrectPassword = dataAuth.validatorState.password;
    const dataUser = dataAuth.user;

    if (isCorrectNickname && isCorrectPassword) {
      const dataFromDb = await myFetch.fetchPost(`/auth/login`, dataUser);

      if (dataFromDb.isLoginCorrect) {
        popupAuth.classList.remove('modal-visible');

        modalAnswer(dataFromDb.message, 1000);

        //запись токена в localStorage
        localStorage.setItem('tokenBikeCaucasus', `Bearer ${dataFromDb.token}`);
        localStorage.setItem('userBikeCaucasus', dataFromDb.userId);
        localStorage.setItem('photoProfileBikeCaucasus', dataFromDb.photoProfile);
        await authIcon();
      } else {
        validationAll.style.color = 'red';
        if (dataFromDb.message === 'Неверный пароль') {
          validationAll.textContent = dataFromDb.message;
          rememberBox.innerHTML = `
          <div class="auth__box auth-remember__box" id="auth__remember">
          	<div class="auth__btn auth-remember__btn" id="auth-remember__btn">Забыли пароль?</div>
          </div>
          `;

          router.rememberButton();
        } else {
          validationAll.textContent = dataFromDb.message;
        }
      }
    } else {
      validationAll.style.color = 'red';
      validationAll.textContent = 'Не все поля заполнены';
      setTimeout(() => {
        validationAll.textContent = '';
      }, 2000);
    }
  },
  async sendRegistration(dataAuth) {
    //блок регистрации
    const validationAll = document.querySelector('#validation__all');

    const isCorrectNickname = dataAuth.validatorState.nickname;
    const isCorrectPassword = dataAuth.validatorState.password;
    const isCorrectEmail = dataAuth.validatorState.email;
    const dataUser = dataAuth.user;
    //вставка иконки профиля по умолчанию
    dataUser.photoProfile = avatar;

    //проверка валидности всех полей
    if (isCorrectNickname && isCorrectPassword && isCorrectEmail) {
      validationAll.textContent = '';

      const dataFromDb = await myFetch.fetchPost('/auth/registration', dataUser);

      if (dataFromDb.isRegistrationCorrect) {
        popupAuth.classList.remove('modal-visible');
        modalAnswer(dataFromDb.message, 3000);
      } else {
        validationAll.style.color = 'red';
        validationAll.textContent = dataFromDb.message;
      }
    } else {
      validationAll.style.color = 'red';
      validationAll.textContent = 'Введенные данные некорректны';
    }
  },

  createNewPassword() {
    try {
      authTemplate.innerHTML = createNewPassword;

      const dataAuth = validation();

      router.button(dataAuth);
      router.closeModal();
    } catch (error) {
      console.log(error);
    }
  },

  async saveNewPassword(dataAuth) {
    try {
      const validationAll = document.querySelector('#validation__all');
      const isCorrectPassword = dataAuth.validatorState.password;
      const password = dataAuth.user.password;

      // const dataUser = dataAuth.user
      if (isCorrectPassword) {
        const token = document.location.href.split('token=')[1];

        const dataFromDb = await myFetch.fetchPost('/auth/password-save', { token, password });
        if (dataFromDb.isSaved) {
          const authBlock = document.querySelector('#auth__block');
          //отрисовка сообщения об успешном сохранении пароля
          authBlock.innerHTML = saved;
        } else {
          validationAll.style.color = 'red';
          validationAll.textContent = dataFromDb.message;
        }
      } else {
        validationAll.style.color = 'red';
        validationAll.textContent = 'Введенные данные некорректны';
      }
    } catch (error) {
      console.log(error);
    }
  },
};
