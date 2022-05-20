import { host } from '../utilities/host.js';

export default {
  async fetchPost(url, bodyObj) {
    try {
      const dataFromDb = await fetch(`${host}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
        body: JSON.stringify(bodyObj),
      }).then((data) => data.json());
      return dataFromDb;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchGet(url) {
    try {
      const dataFromDb = await fetch(`${host}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
      }).then((data) => data.json());
      return dataFromDb;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchPostFile(url, file) {
    try {
      const dataFromDb = await fetch(`${host}${url}`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
        body: file,
      }).then((data) => data.json());
      return dataFromDb;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchGetFile(url) {
    try {
      const dataFromDb = await fetch(`${host}${url}`, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('tokenBikeCaucasus'),
        },
      });
      return dataFromDb;
    } catch (error) {
      console.log(error);
    }
  },
};
