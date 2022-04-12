import time from '../utilities/time.js';
export default function (dataResult) {
  const leaderTime = time.timeToSecondes(dataResult[0].timeTotal);
  const lengthResult = dataResult.length;
  dataResult[0].lagLeader = '00:00';
  for (let i = 1; i < lengthResult; i++) {
    let lag = time.secondesToTime(
      time.timeToSecondes(dataResult[i].timeTotal) - leaderTime
    );
    let lagBefore = time.secondesToTime(
      time.timeToSecondes(dataResult[i].timeTotal) -
        time.timeToSecondes(dataResult[i - 1].timeTotal)
    );
    dataResult[i].lagLeader = '+' + lag;
    dataResult[i].lagBefore = '+' + lagBefore;
  }
}
