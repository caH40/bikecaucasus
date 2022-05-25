import PasswordReset from '../Model/Password-reset.js';

export default async function () {
  try {
    const requestResetPassword = await PasswordReset.find();
    const dateNow = new Date().getTime();
    //48 часов на активацию нового аккаунта
    const activationPeriod = 172800000;

    const length = requestResetPassword.length;
    for (let i = 0; i < length; i++) {
      let expiration = dateNow - requestResetPassword[i].dateRequest;
      if (expiration > activationPeriod) {
        await PasswordReset.findOneAndDelete({
          dateRequest: requestResetPassword[i].dateRequest,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
