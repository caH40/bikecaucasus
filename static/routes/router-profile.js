import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';
import reduceImage from '../utilities/reduce-image.js';
import authIcon from '../utilities/auth-icon.js';
import routerDzhilisu from '../routes/route-dzhilsu.js';

export default {
  router() {
    try {
      const profileEdit = document.querySelector('#profile__edit-btn');
      const profileTable = document.querySelector('.profile__table');

      profileEdit.addEventListener('click', async (event) => {
        const response = await fetch(`${host}/profile/edit`, {
          headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
        }).then((data) => data.json());

        const dataTemplate = response;
        render(dataTemplate, '#profileEditTemplate');
        this.routerEdit();
      });

      profileTable.addEventListener('click', async (event) => {
        const id = event.target.id;
        if (event.target.localName !== 'td') {
          return;
        }
        const dataFormDb = await fetch(`${host}/dzhilsu/result/?id=${id}`, {
          headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
        }).then((data) => data.json());

        routerDzhilisu.routerResult(dataFormDb);
      });
    } catch (error) {
      console.log(error);
    }
  },
  routerEdit() {
    try {
      const sendForm = document.querySelector('#profile-edit__send-form');
      const buttonPhoto = document.querySelector('#profile__edit-btn-file');
      const inputPhoto = document.querySelector('#profile__img-input');
      const profilePhotoBox = document.querySelector('#profile__img-box');

      sendForm.addEventListener('click', async (event) => {
        event.preventDefault();

        const lastName = document.querySelector('#lastname').value;
        const firstName = document.querySelector('#firstname').value;
        const patronymic = document.querySelector('#patronymic').value;
        const birthday = document.querySelector('#birthday').value;
        const city = document.querySelector('#city').value;
        const team = document.querySelector('#team').value;
        // const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;
        const profileBigPhoto = document.querySelector('#profile__img-big');

        let photoRow;
        if (profileBigPhoto) {
          photoRow = profileBigPhoto.src;
          // console.log(profilePhoto);
          localStorage.setItem('photoProfileBikeCaucasus', photoRow);
        }

        var gender = document.querySelector('#gender');
        if (gender.options.selectedIndex === 0) {
          gender = 'мужской';
        } else {
          gender = 'женский';
        }

        const newProfile = {
          lastName,
          firstName,
          patronymic,
          birthday: Number(birthday),
          city,
          team,
          gender,
          phone,
          photoProfile: photoRow,
        };

        const response = await fetch(`${host}/profile/edited`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('tokenBikeCaucasus'),
          },
          body: JSON.stringify(newProfile),
        })
          .then((data) => data.json())
          .catch((error) => console.log(error));

        const modalAnswer = document.querySelector('#modal__answer');
        const serverAnswer = document.querySelector('#server__answer');

        modalAnswer.classList.add('visible');
        serverAnswer.innerHTML = response.message;
        setTimeout(() => {
          modalAnswer.classList.remove('visible');
        }, 1000);
        //очистка старой иконки профиля
        const photoProfile = await authIcon(true);

        this.routerProfile();
      });

      buttonPhoto.addEventListener('click', () => {
        inputPhoto.click();
      });

      inputPhoto.addEventListener('change', changeHandler);

      function changeHandler(event) {
        if (!event.target.files.length) {
          return;
        }
        const file = event.target.files[0];

        if (!file.type.match('image')) {
          return;
        }

        const reader = new FileReader();
        reader.onload = async (ev) => {
          let src = ev.target.result;
          src = await reduceImage(src, 400);

          profilePhotoBox.innerHTML = `<img class="profile__img" src="${src}" id="profile__img-big" />`;
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async routerProfile() {
    try {
      const dataFormDb = await fetch(`${host}/profile/info`, {
        headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
      }).then((data) => data.json());

      if (dataFormDb.message) {
        document.querySelector('.handlebars').textContent = dataFormDb.message;
        return;
      }
      const dataProfile = dataFormDb.profile;
      const dataResult = dataFormDb.dataResult;
      const dataEvent = dataFormDb.dataEvent;

      for (let i = 0; i < dataResult.length; i++) {
        let event = dataEvent.find((e) => e.eventId === dataResult[i].eventId);
        dataResult[i] = { ...dataResult[i], ...event };
      }
      const dataTemplate = {
        list: dataResult,
        ...dataProfile,
      };
      render(dataTemplate, '#profileTemplate');

      this.router();
    } catch (error) {
      console.log(error);
    }
  },
};
