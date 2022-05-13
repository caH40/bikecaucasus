import router from '../routes/route-dzhilsu.js';
import controller from '../controllers/dzhilisuController.js';

async function start() {
  try {
    const idEvent = document.location.search.split('=')[1];
    console.log(idEvent);
    await controller.eventResult(idEvent);
    router.routerEventResult(idEvent);
  } catch (error) {
    console.log(error);
  }
}
start();
