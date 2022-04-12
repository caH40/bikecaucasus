export default {
  timeToSecondes(time) {
    const timeArr = time.split(':');
    const length = timeArr.length;

    if (length === 3) {
      const seconds = +timeArr[0] * 3600 + +timeArr[1] * 60 + +timeArr[2];
      return seconds;
    }
    if (length === 2) {
      return +timeArr[0] * 60 + +timeArr[1];
    }
  },

  secondesToTime(seconds) {
    if (seconds > 3599) {
      const hour = Math.trunc(seconds / 3600);
      const minutes = Math.trunc((seconds - hour * 3600) / 60);
      const second = seconds - hour * 3600 - minutes * 60;
      return `${this.addNull(hour)}:${this.addNull(minutes)}:${this.addNull(
        second
      )}`;
    } else {
      const minutes = Math.trunc(seconds / 60);
      const second = seconds - minutes * 60;
      return `${this.addNull(minutes)}:${this.addNull(second)}`;
    }
  },
  addNull(number) {
    number = String(number);
    if (number.length === 1) {
      return '0' + number;
    }
    if (number.length === 2) {
      return number;
    }
  },
};
