export default function (dataEvent, dataResult) {
  const length = dataEvent.length;
  for (let i = 0; i < length; i++) {
    dataEvent[i].tableNumber = i + 1;
    dataEvent[i].quantity = dataResult.filter(
      (element) => element.eventId === dataEvent[i].eventId
    ).length;
  }
}
