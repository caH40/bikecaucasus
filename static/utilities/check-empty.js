export function checkEmpty(nameInputElement, selectorSvg) {
  const svg = document.querySelector(selectorSvg);
  console.log(selectorSvg);
  nameInputElement.addEventListener('input', () => {
    let lengthInput = nameInputElement.value.length;
    if (lengthInput == 0) {
      svg.classList.remove('notEmpty');
    } else {
      svg.classList.add('notEmpty');
    }
  });
}

export function checkEmptySelect(nameInputElement, selectorSvg) {
  const svg = document.querySelector(selectorSvg);
  nameInputElement.addEventListener('click', () => {
    let lengthInput = nameInputElement.value.length;
    if (lengthInput == 0) {
      svg.classList.remove('notEmpty');
    } else {
      svg.classList.add('notEmpty');
    }
  });
}

export function checkAllInputs() {
  const svg = document.querySelector('#btn__send-form-img');
  const inputs = document.querySelectorAll('input');
  const buttonSendForm = document.querySelector('#btn__send-form');
  const finalSpan = document.getElementById('btn__send-form-text');
  const textarea = document.getElementById('description-area');

  buttonSendForm.addEventListener('mouseover', () => {
    let checker = true;
    if (textarea.value) {
      checker = true;
    } else {
      checker = false;
    }
    inputs.forEach((element) => {
      if (element.id === 'url-video') {
        return;
      }
      if (element.value === '') {
        checker = checker && false;
      }
    });
    if (checker) {
      finalSpan.textContent = 'Можно отправлять!';
      svg.classList.add('notEmpty');
    } else {
      finalSpan.textContent = 'Не все поля заполенны!';
      finalSpan.classList.add('empty');
      svg.classList.remove('notEmpty');
    }
  });

  buttonSendForm.addEventListener('mouseout', () => {
    finalSpan.classList.remove('empty');
    finalSpan.textContent = '';
  });
}
