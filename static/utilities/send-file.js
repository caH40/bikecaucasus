export default {
  async trek(file) {
    try {
      await axios.post('/uploadTrek', file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async photo(file) {
    try {
      console.log('отправка фотографии');
      await axios.post('/uploadPhoto', file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
