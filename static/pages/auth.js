export default function authPage() {
  const login = document.querySelector('#login');
  const popupAuth = document.querySelector('.popup__auth');
  const svgCross = document.querySelector('.svg__cross');

  login.addEventListener('click', (event) => {
    console.log(event);
    event.preventDefault();
    popupAuth.classList.add('modal-visible');
  });
  svgCross.addEventListener('click', (event) => {
    popupAuth.classList.remove('modal-visible');
  });
  //закрытие модального окна при нажатии на esc
  document.addEventListener('keydown', (event) => {
    const keyCode = event.keyCode;
    if (keyCode !== 27) {
      return;
    }

    popupAuth.classList.remove('modal-visible');
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
    }
    if (event.target.id === 'auth__registration') {
      authLogin.classList.add('auth__gray');
      authRegistration.classList.remove('auth__gray');
      email.classList.remove('displayNone');
    }
  });
  // -----------------------------------------------------------
  //валидация вводимых символов
  const authInputNickname = document.querySelector('#auth__input-nickname');
  const authInputPassword = document.querySelector('#auth__input-password');
  const authInputEmail = document.querySelector('#auth__input-email');

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
      }
    } else {
      validationNickname.textContent = 'от 4 до 12 символов';
    }
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
    } else {
      validationPassword.textContent = 'пароль слишком простой';
    }
  });

  //валидация password
  authInputEmail.addEventListener('input', () => {
    const email = authInputEmail.value;
    const valEmail = validator.isEmail(email);
    if (valEmail) {
      validationEmail.textContent = '';
    } else {
      validationEmail.textContent = 'некорректный e-mail';
    }
  });
}
