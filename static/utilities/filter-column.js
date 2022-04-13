export default function filterColumn(dataPageTable, column) {
  if (column === 'athlete' || column === 'athleteCity') {
    filterString(dataPageTable, column);
    return dataPageTable;
  } else {
    filterNumber(dataPageTable, column);
    return dataPageTable;
  }
}

function filterNumber(dataPageTable, column) {
  if (localStorage.getItem('direction') === 'up') {
    dataPageTable = dataPageTable.sort((a, b) => a[column] - b[column]);
    localStorage.setItem('direction', 'down');
  } else {
    dataPageTable = dataPageTable.sort((a, b) => b[column] - a[column]);
    localStorage.setItem('direction', 'up');
  }
  return dataPageTable;
}

function filterString(dataPageTable, column) {
  if (localStorage.getItem('direction') === 'up') {
    dataPageTable = dataPageTable.sort((a, b) => {
      let nameA = a[column];
      let nameB = b[column];
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    localStorage.setItem('direction', 'down');
  } else {
    dataPageTable = dataPageTable.sort((a, b) => {
      let nameA = a[column];
      let nameB = b[column];
      if (nameA < nameB) return 1;
      if (nameA > nameB) return -1;
      return 0;
    });
    localStorage.setItem('direction', 'up');
  }
  return dataPageTable;
}
