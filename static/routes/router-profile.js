import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';

export default {
  router() {
    try {
      const profileEdit = document.querySelector('#profile__edit-btn');

      profileEdit.addEventListener('click', async (event) => {
        const response = await fetch(`${host}/profile/edit`, {
          headers: { authorization: localStorage.getItem('tokenBikeCaucasus') },
        }).then((data) => data.json());
        console.log(response);

        const dataTemplate = response;
        render(dataTemplate, '#profileEditTemplate');
        this.routerEdit();
      });
    } catch (error) {
      console.log(error);
    }
  },
  routerEdit() {
    try {
      const sendForm = document.querySelector('#profile-edit__send-form');

      sendForm.addEventListener('click', async (event) => {
        event.preventDefault();

        const lastName = document.querySelector('#lastname').value;
        const firstName = document.querySelector('#firstname').value;
        const patronymic = document.querySelector('#patronymic').value;
        const birthday = document.querySelector('#birthday').value;
        const city = document.querySelector('#city').value;
        const team = document.querySelector('#team').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;

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
          email,
          phone,
        };

        const response = await fetch(`${host}/profile/edit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('tokenBikeCaucasus'),
          },
          body: JSON.stringify(newProfile),
        })
          .then((data) => data.json())
          .catch((error) => console.log(error));

        console.log(response.message);
        this.routerProfile();
      });
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
      // console.log(dataProfile, dataResult, dataEvent);

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
