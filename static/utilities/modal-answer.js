export default function modalAnswer(answer, selector) {
  const element = document.querySelector(`#${selector}`);
  element.insertAdjacentHTML(
    'afterbegin',
    `
		<div class="popup__auth">
			<div class="auth__container">
				<div class="auth__block">
		.			${answer}
				</div>
			</div>
		</div>
`
  );
}
