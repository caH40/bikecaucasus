export default function filterTrail(
  dataPageTable,
  column,
  nameDirection,
  filter
) {
  // dataPageTable = dataPageTable.filter((element) => element.state === filter);
  if (localStorage.getItem(nameDirection) === 'up') {
    dataPageTable = dataPageTable.sort((a, b) => a[column] - b[column]);
  } else {
    dataPageTable = dataPageTable.sort((a, b) => b[column] - a[column]);
  }
  return dataPageTable;
}
