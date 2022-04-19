import { host } from '../utilities/host.js';
import { render } from '../view/viewer.js';
import prepData from '../utilities/prep-data.js';

async function descriptionPage() {
  try {
    let id = document.location.search;
    const data = await fetch(`${host}/description/getdata${id}`).then((data) =>
      data.json()
    );
    const textPhoto = prepData.description(data);

    render(
      {
        listL: textPhoto[0],
        listR: textPhoto[1],
        card: data.card,
      },
      '#descriptionTemplate'
    );
  } catch (error) {
    console.log(error);
  }
}
descriptionPage();
