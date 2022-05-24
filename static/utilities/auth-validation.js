export default function () {
  const authInputNickname = document.querySelector('#auth__input-nickname');
  const authInputPassword = document.querySelector('#auth__input-password');
  const authInputEmail = document.querySelector('#auth__input-email');

  const validationNickname = document.querySelector('#validation__nickname');
  const validationPassword = document.querySelector('#validation__password');
  const validationEmail = document.querySelector('#validation__email');

  const validatorState = {};
  let user = {};

  //валидация nickname
  if (authInputNickname) {
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
  }

  //валидация password
  if (authInputPassword) {
    authInputPassword.addEventListener('input', () => {
      const password = authInputPassword.value;
      const valAlphanumeric = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      });
      // boxRemember.innerHTML = '';
      // validationAll.textContent = '';
      if (valAlphanumeric) {
        validationPassword.textContent = '';
        validatorState.password = true;
      } else {
        validationPassword.textContent = 'пароль слишком простой';
        validatorState.password = false;
      }
      user.password = password;
    });
  }

  //валидация email
  if (authInputEmail) {
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
  }
  return { validatorState, user };
}
