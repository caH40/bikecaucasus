import authController from '../controllers/authController.js';

try {
  authController.createNewPassword();
} catch (error) {
  console.log(error);
}
