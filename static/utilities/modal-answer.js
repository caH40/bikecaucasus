export default function modalAnswer(answer, timer = 1500, reload = true) {
  const modalAnswer = document.querySelector('#modal__answer');
  const serverAnswer = document.querySelector('#server__answer');

  modalAnswer.classList.add('visible');
  serverAnswer.innerHTML = answer;
  setTimeout(() => {
    modalAnswer.classList.remove('visible');
    if (reload) {
      window.location.reload();
    }
  }, timer);
}
