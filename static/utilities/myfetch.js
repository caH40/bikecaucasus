import { host } from '../utilities/host.js';

export default {
  async fetchPost(url, bodyObj) {
    const dataFromDb = await fetch(`${host}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('tokenBikeCaucasus'),
      },
      body: JSON.stringify(bodyObj),
    }).then((data) => data.json());
    return dataFromDb;
  },
};
