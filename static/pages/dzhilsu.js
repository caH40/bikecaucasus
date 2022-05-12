import router from '../routes/route-dzhilsu.js';

async function dzhilsuMainPage() {
  try {
    router.routerMain();
    router.routerMain();
  } catch (error) {
    console.log(error);
  }
}
dzhilsuMainPage();
