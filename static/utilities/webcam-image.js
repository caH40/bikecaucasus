import myFetch from './myfetch.js';

export default async function () {
  let response = await myFetch.fetchGetFile('/main/screenshot', {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      authorization: localStorage.getItem('tokenBikeCaucasus'),
    },
  });
  let imgBlob;
  let imageCamera;

  imgBlob = await response.blob();
  imageCamera = URL.createObjectURL(imgBlob);

  let webCameraBox = document.querySelector('#column-main__webcamera');
  webCameraBox.innerHTML = '';
  webCameraBox.insertAdjacentHTML(
    'afterbegin',
    `
	<div class="main__block-column column-main">
	<h4 class="camera__title">Вебкамера на горе Шаджатмаз</h4>
				<a  class="column-main__box" href="https://gw.cmo.sai.msu.ru/webcam5.jpg" target="_blank" ">
	<img class="camera__img" src="${imageCamera}" />
	</a>
	</div>
	`
  );

  webCameraBox = document.querySelector('[data-id="block-news__inter-container-0"]');
  webCameraBox.innerHTML = '';
  webCameraBox.insertAdjacentHTML(
    'afterbegin',
    `
		
	<div class="main__block-column column-main">
	<h4 class="camera__title">Вебкамера на горе Шаджатмаз</h4>
	<a  class="column-main__box" href="https://gw.cmo.sai.msu.ru/webcam5.jpg" target="_blank" ">
	<img class="camera__img" src="${imageCamera}" />
	</a>
	</div>
	`
  );
}
