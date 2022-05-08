import { youtube, garmin } from './fix-url.js';
export default {
  description(data) {
    try {
      data.card.dateCreate = new Date(data.card.id).toLocaleDateString();
      const authorPhoto = data.authorPhoto;
      let authorPhotoDomain;
      if (authorPhoto) {
        authorPhotoDomain = authorPhoto.split('/')[2];
      }
      const text = data.card.descriptionArea.split('\n');
      let textPhotoL = [];
      let textPhotoR = [];
      let textPhotoMobile = [];
      data.card.urlVideo = youtube(data.card.urlVideo);
      data.card.urlTrekGConnectEmber = garmin(data.card.urlTrekGConnect);

      for (let i = 0; i < text.length; i++) {
        //необходимо сделать проверку на равное количество элементов в массивах текст и фото
        if (text[i]) {
          textPhotoL.push({
            paragraph: text[i],
            paragraphPhoto: data.descPhoto[i],
            authorPhoto,
            authorPhotoDomain,
          });
          i++;
          textPhotoR.push({
            paragraph: text[i],
            paragraphPhoto: data.descPhoto[i],
            authorPhoto,
            authorPhotoDomain,
          });
        }
      }
      for (let i = 0; i < text.length; i++) {
        if (text[i]) {
          textPhotoMobile.push({
            paragraph: text[i],
            paragraphPhoto: data.descPhoto[i],
            authorPhoto,
            authorPhotoDomain,
          });
        }
      }
      if (data.kudos.kudoses >= 0) {
        data.kudos.kudoses = `+${data.kudos.kudoses}`;
      } else {
        data.kudos.kudoses = `-${data.kudos.kudoses}`;
      }
      return [textPhotoL, textPhotoR, textPhotoMobile];
    } catch (error) {
      console.log(error);
    }
  },
};
