export const ItemDate = {
  data() {
    return {}
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    correctTimeToString(inputTime) {
      let resultText = "";

      let inputTimeDate = new Date(inputTime);
      let currentTime = new Date();
      let yesterdayTime = new Date().setDate(currentTime.getDate() - 1);
      yesterdayTime = new Date(yesterdayTime);

      let timeCreateTaskMilli = currentTime.getTime() - inputTimeDate.getTime();

      if (timeCreateTaskMilli < 1) timeCreateTaskMilli = 100;

      let minute = Math.floor((timeCreateTaskMilli / (1000*60)) % 60),
          hour = Math.floor((timeCreateTaskMilli / (1000*60*60)) % 60);

      let isCurrentDay = currentTime.getDate() === inputTimeDate.getDate(),
          isCurrentMonth = currentTime.getMonth() === inputTimeDate.getMonth(),
          isCurrentYear = currentTime.getFullYear() === inputTimeDate.getFullYear()

      let monthArray = ['янв', 'февр', 'марта', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];
      let dayCreate = inputTimeDate.getDate() < 10 ? `0${inputTimeDate.getDate()}` : inputTimeDate.getDate(),
          hourCreate = inputTimeDate.getHours() < 10 ? `0${inputTimeDate.getHours()}` : inputTimeDate.getHours(),
          minuteCreate = inputTimeDate.getMinutes() < 10 ? `0${inputTimeDate.getMinutes()}` : inputTimeDate.getMinutes();

      let isNotFull = true;

      if (minute < 1 && hour === 0 && isCurrentDay && isCurrentMonth && isCurrentYear) {
        resultText += ` 1 минуту назад`;
      } else if (minute < 5 && hour === 0 && isCurrentDay && isCurrentMonth && isCurrentYear) {
        resultText += ` ${minute} минуты назад`;
      } else if (minute < 30 && hour === 0 && isCurrentDay && isCurrentMonth && isCurrentYear) {
        resultText += ` ${minute} минут назад`;
      } else if (minute > 30 && minute < 90 && hour < 2 && isCurrentDay && isCurrentMonth && isCurrentYear) {
        resultText += ` 1 час назад`;
      } else if (hour < 5 && isCurrentDay && isCurrentMonth && isCurrentYear) {
        resultText += ` ${hour} часа назад`;
      } else if (hour < 7 && isCurrentDay && isCurrentMonth && isCurrentYear) {
        resultText += ` ${hour} часов назад`;
      } else if (isCurrentDay && isCurrentMonth && isCurrentYear) {
        resultText += ` сегодня в ${hourCreate}:${minuteCreate}`;
        isNotFull = false;
      } else if (inputTimeDate.getDate() === yesterdayTime.getDate() && isCurrentMonth && isCurrentYear) {
        resultText += ` вчера в ${hourCreate}:${minuteCreate}`;
        isNotFull = false;
      } else if (!isCurrentYear) {
        resultText += ` ${dayCreate} ${monthArray[inputTimeDate.getMonth()]} ${inputTimeDate.getFullYear()} в ${hourCreate}:${minuteCreate}`;
        isNotFull = false;
      } else {
        resultText += ` ${dayCreate} ${monthArray[inputTimeDate.getMonth()]} в ${hourCreate}:${minuteCreate}`;
        isNotFull = false;
      }

      return {
        date: resultText,
        isFull: !isNotFull
      };
    },

    getFullTime(inputTime) {
      let inputTimeDate = new Date(inputTime);

      let monthArray = ['янв', 'февр', 'марта', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];
      let dayCreate = inputTimeDate.getDate() < 10 ? `0${inputTimeDate.getDate()}` : inputTimeDate.getDate(),
          hourCreate = inputTimeDate.getHours() < 10 ? `0${inputTimeDate.getHours()}` : inputTimeDate.getHours(),
          minuteCreate = inputTimeDate.getMinutes() < 10 ? `0${inputTimeDate.getMinutes()}` : inputTimeDate.getMinutes();

      return `${dayCreate} ${monthArray[inputTimeDate.getMonth()]} ${inputTimeDate.getFullYear()} в ${hourCreate}:${minuteCreate}`;
    },

    taskTimeToView(inputTime) {
      let mo = Math.floor(inputTime / (3600*160)),
          w = Math.floor(inputTime % (3600*160) / (3600*40)),
          d = Math.floor(inputTime % (3600*40) / (3600*8)),
          h = Math.floor(inputTime % (3600*8) / 3600),
          m = Math.floor(inputTime % 3600 / 60),
          s = Math.floor(inputTime % 60);

      let resultText = mo > 0 ? mo + "mo " : "";
      resultText += w > 0 ? w + "w " : "";
      resultText += d > 0 ? d + "d " : "";
      resultText += h > 0 ? h + "h " : "";
      resultText += m > 0 ? m + "m " : "";
      resultText += s > 0 ? s + "s" : "";

      return resultText !== "" ? resultText.trim() : "0s";
    },

    toTaskTime(inputTime) {
      let month = inputTime.match(/\b\d+[.,]*\d*mo\b/i),
          weeks = inputTime.match(/\b\d+[.,]*\d*w\b/i),
          days = inputTime.match(/\b\d+[.,]*\d*d\b/i),
          hour = inputTime.match(/\b\d+[.,]*\d*h\b/i),
          minutes = inputTime.match(/\b\d+[.,]*\d*m\b/i),
          seconds = inputTime.match(/\b\d+[.,]*\d*s\b/i);

      month = month !== null ? +month[0].replace(/[.,]/, '.').replace(/mo/, '') : 0;
      weeks = weeks !== null ? +weeks[0].replace(/[.,]/, '.').replace(/w/, '') : 0;
      days = days !== null ? +days[0].replace(/[.,]/, '.').replace(/d/, '') : 0;
      hour = hour !== null ? +hour[0].replace(/[.,]/, '.').replace(/h/, '') : 0;
      minutes = minutes !== null ? +minutes[0].replace(/[.,]/, '.').replace(/m/, '') : 0;
      seconds = seconds !== null ? +seconds[0].replace(/[.,]/, '.').replace(/s/, '') : 0;

      let result = month * 160;
      result += weeks * 40;
      result += days * 8;
      result += hour;
      result *= 3600;
      result += minutes * 60;
      result = Math.round(result + seconds);

      return Math.abs(result);
    }
  }
}