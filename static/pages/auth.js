import { host } from '../utilities/host.js';
import modalAnswer from '../utilities/modal-answer.js';
export default function authPage() {
  try {
    let user = {};
    const validatorState = {};
    let loginPage = true;

    const loginBox = document.querySelector('#login__box');
    const login = document.querySelector('#login');
    const logout = document.querySelector('#logout');
    const popupAuth = document.querySelector('.popup__auth');
    const authBlock = document.querySelector('#auth__block');
    const svgCross = document.querySelector('.svg__cross');
    const authButton = document.querySelector('#auth__btn');
    const validationAll = document.querySelector('#validation__all');

    const authInputNickname = document.querySelector('#auth__input-nickname');
    const authInputPassword = document.querySelector('#auth__input-password');
    const authInputEmail = document.querySelector('#auth__input-email');

    loginBox.addEventListener('click', (event) => {
      //включение модального окна
      if (event.target.id === 'logout') {
        localStorage.removeItem('tokenBikeCaucasus');
        login.classList.add('visible');
        logout.classList.remove('visible');

        modalAnswer('Выход...Возвращайтесь!');
        return;
      }
      if (event.target.id === 'login') {
        popupAuth.classList.add('modal-visible');
        return;
      }
    });
    svgCross.addEventListener('click', (event) => {
      popupAuth.classList.remove('modal-visible');
    });
    //закрытие модального окна при нажатии на esc
    document.addEventListener('keydown', (event) => {
      const keyCode = event.keyCode;
      if (keyCode !== 27 && keyCode !== 13) {
        return;
      }
      if (keyCode === 27) {
        popupAuth.classList.remove('modal-visible');
      } else {
        //при нажатии на Enter кликается кнопка вход/регистрация
        authButton.click();
      }
    });

    //работа с входом/регистрацией
    const authTitle = document.querySelector('.auth__title');
    const authLogin = document.querySelector('#auth__login');
    const email = document.querySelector('#auth__email');
    const authRegistration = document.querySelector('#auth__registration');
    authTitle.addEventListener('click', (event) => {
      if (!event.target === 'span') {
        return;
      }
      if (event.target.id === 'auth__login') {
        authRegistration.classList.add('auth__gray');
        authLogin.classList.remove('auth__gray');
        email.classList.add('displayNone');
        authButton.textContent = 'Вход';
        authInputNickname.value = '';
        authInputPassword.value = '';
        validationAll.textContent = '';
        loginPage = true;
      }
      if (event.target.id === 'auth__registration') {
        authLogin.classList.add('auth__gray');
        authRegistration.classList.remove('auth__gray');
        email.classList.remove('displayNone');
        authButton.textContent = 'Регистрация';
        authInputNickname.value = '';
        authInputPassword.value = '';
        validationAll.textContent = '';
        loginPage = false;
      }
    });
    // -----------------------------------------------------------
    //валидация вводимых символов

    const validationNickname = document.querySelector('#validation__nickname');
    const validationPassword = document.querySelector('#validation__password');
    const validationEmail = document.querySelector('#validation__email');

    //валидация nickname
    authInputNickname.addEventListener('input', () => {
      const nickname = authInputNickname.value;
      const valLength = validator.isLength(nickname, { min: 4, max: 12 });
      const valAlphanumeric = validator.isAlphanumeric(nickname);

      if (valLength) {
        validationNickname.textContent = '';
        if (!valAlphanumeric) {
          validationNickname.textContent = 'только символы [a-z][0-9]';
          validatorState.nickname = false;
        } else {
          validatorState.nickname = true;
        }
      } else {
        validationNickname.textContent = 'от 4 до 12 символов';
        validatorState.nickname = false;
      }
      user.username = nickname;
    });

    //валидация password
    authInputPassword.addEventListener('input', () => {
      const password = authInputPassword.value;
      const valAlphanumeric = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      });
      if (valAlphanumeric) {
        validationPassword.textContent = '';
        validatorState.password = true;
      } else {
        validationPassword.textContent = 'пароль слишком простой';
        validatorState.password = false;
      }
      user.password = password;
    });

    //валидация email
    authInputEmail.addEventListener('input', () => {
      const email = authInputEmail.value;
      const valEmail = validator.isEmail(email);
      if (valEmail) {
        validationEmail.textContent = '';
        validatorState.email = true;
        user.email = email;
      } else {
        validationEmail.textContent = 'некорректный e-mail';
        validatorState.email = false;
      }
    });

    //Отправка данных
    authButton.addEventListener('click', async () => {
      //проверка окна входа или регистрации
      if (loginPage) {
        //блок авторизации
        //проверка валидности всех полей
        if (validatorState.nickname && validatorState.password) {
          const response = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // referrerPolicy: 'unsafe-url',
            body: JSON.stringify(user),
          });
          const json = await response.json();
          if (response.ok) {
            authInputNickname.value = '';
            authInputPassword.value = '';
            authInputEmail.value = '';

            popupAuth.classList.remove('modal-visible');
            modalAnswer(json.message, 2000);
            //запись токена в localStorage
            localStorage.setItem('tokenBikeCaucasus', `Bearer ${json.token}`);
            localStorage.setItem('userBikeCaucasus', json.userId);
            //перерисовка иконки входа
            logout.classList.add('visible');
            login.classList.remove('visible');

            validatorState.nickname = false;
            validatorState.password = false;
          } else {
            validationAll.style.color = 'red';
            validationAll.textContent = json.message;
          }
        } else {
          validationAll.style.color = 'red';
          validationAll.textContent = 'Не все поля заполнены';
          setTimeout(() => {
            validationAll.textContent = '';
          }, 2000);
        }
      } else {
        //блок регистрации
        //проверка валидности всех полей
        if (
          validatorState.nickname &&
          validatorState.password &&
          validatorState.email
        ) {
          validationAll.textContent = '';
          const response = await fetch(`${host}/auth/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // referrerPolicy: 'unsafe-url',
            body: JSON.stringify(user),
          });

          let json = await response.json();

          if (response.ok) {
            modalAnswer(json.message, 2000);

            authRegistration.classList.add('auth__gray');
            authLogin.classList.remove('auth__gray');
            email.classList.add('displayNone');
            authButton.textContent = 'Вход';
            authInputNickname.value = '';
            authInputPassword.value = '';
            validationAll.textContent = '';
            loginPage = true;

            authInputNickname.value = '';
            authInputPassword.value = '';
            authInputEmail.value = '';
            validatorState.nickname = false;
            validatorState.password = false;
            validatorState.email = false;
          } else {
            validationAll.style.color = 'red';
            validationAll.textContent = json.message;
          }
        } else {
          validationAll.style.color = 'red';
          validationAll.textContent = 'Введенные данные некорректны';
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
