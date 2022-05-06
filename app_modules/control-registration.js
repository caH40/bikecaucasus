import User from '../Model/User.js';
import UserConfirm from '../Model/User-confirm.js';

export default async function () {
  try {
    const usersForConfirm = await UserConfirm.find();
    const dateNow = new Date().getTime();
    //48 часов на активацию нового аккаунта
    const activationPeriod = 172800000;

    const length = usersForConfirm.length;
    for (let i = 0; i < length; i++) {
      let expiration = dateNow - usersForConfirm[i].dateRegistration;
      if (expiration > activationPeriod) {
        let { userId } = usersForConfirm[i];
        let userConfirmDeleted = await UserConfirm.findOneAndDelete({ userId });
        let userDeleted = await User.findOneAndDelete({ _id: userId });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
