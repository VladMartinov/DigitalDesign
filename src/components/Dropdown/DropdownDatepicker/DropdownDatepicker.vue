<template>
  <div class="datepicker-form" :class="{ 'hidden' : !isActive }">
    <div class="datepicker-form__top">
      <div class="datepicker-form__prev-button" @click="onPrevButtonClick">
        <SvgIcon :name="'arrow-left'"></SvgIcon>
      </div>

      <div class="datepicker-form__dropdown-selects">
        <div class="datepicker-form__dropdown-wrapper">
          <InputSelect :inputValueArray="dropdownMonth" :currentValId="'' + currentMonth" :isSelectDefValueByValue="currentMonth" :hideClearButton="true" @onValueSelected="onMonthSelected"></InputSelect>
        </div>

        <div class="datepicker-form__dropdown-wrapper">
          <InputSelect :inputValueArray="dropdownYear" :currentValId="'' + currentYear" :isSelectDefValueByValue="currentYear" :hideClearButton="true" @onValueSelected="onYearSelected"></InputSelect>
        </div>
      </div>

      <div class="datepicker-form__next-button" @click="onNextButtonClick">
        <SvgIcon :name="'arrow-right'"></SvgIcon>
      </div>
    </div>

    <div class="datepicker-form__days-list">
      <div class="datepicker-form__name-row">
        <div v-for="day in daysNameArray" :key="day" class="datepicker-form__day">
          <span class="text text_disabled">{{ day }}</span>
        </div>
      </div>

      <div class="datepicker-form__row">
        <div v-for="(day, index) in getDays()" :key="index" class="datepicker-form__day" :class="{ 'current' : day.isCurrentDay, 'active' : isSelectedDay(day.number, day.isNotCurrentMonth)}" :data-day="day.number" :data-notCurrMonth="day.isNotCurrentMonth" @click="onSelectDay">
          <span class="text" :class="isSelectedDay(day.number, day.isNotCurrentMonth) ? '' : day.isNotCurrentMonth ? 'text_disabled' : 'text_prim'">{{ day.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

import InputSelect from '@/components/Inputs/InputSelect/InputSelect.vue'

export default {
  props: {
    currentValue: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdownYear: [],
      dropdownMonth: [
        {
          name: 'Январь',
          _id: '0'
        },
        {
          name: 'Февраль',
          _id: '1'
        },
        {
          name: 'Март',
          _id: '2'
        },
        {
          name: 'Апрель',
          _id: '3'
        },
        {
          name: 'Май',
          _id: '4'
        },
        {
          name: 'Июнь',
          _id: '5'
        },
        {
          name: 'Июль',
          _id: '6'
        },
        {
          name: 'Август',
          _id: '7'
        },
        {
          name: 'Сентябрь',
          _id: '8'
        },
        {
          name: 'Октябрь',
          _id: '9'
        },
        {
          name: 'Ноябрь',
          _id: '10'
        },
        {
          name: 'Декабрь',
          _id: '11'
        },
      ],

      currentYear: (new Date()).getFullYear(),
      currentMonth: (new Date()).getMonth(),

      daysNameArray: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    }
  },
  components: {
    SvgIcon,
    InputSelect
  },
  computed: {},
  created() {
    for (let i = this.currentYear - 25; i < this.currentYear + 25; i++) {
      this.dropdownYear.push({
        _id: '' + i,
        name: i
      })
    }
  },
  watch: {},
  methods: {
    onMonthSelected: function(event) {
      this.currentMonth = +event.valId;
    },

    onYearSelected: function(event) {
      this.currentYear = +event.valId;
    },
    
    onPrevButtonClick: function() {
      if (this.currentMonth > 0) {
        this.currentMonth -= 1;
      } else {
        if (this.currentYear > +this.dropdownYear[0].id) {
          this.currentMonth = 11;
          this.currentYear -= 1;
        }
      }
    },

    onNextButtonClick: function() {
      if (this.currentMonth < 11) {
        this.currentMonth += 1;
      } else {
        if (this.currentYear < +this.dropdownYear[this.dropdownYear.length - 1].id) {
          this.currentMonth = 0;
          this.currentYear += 1;
        }
      }
    },

    isSelectedDay: function(currentValDay, isNotCurrentMonth) {
      let currentSelectedYear = this.currentValue.slice(0, 10).split('-')[0];
      let currentSelectedMonth = this.currentValue.slice(0, 10).split('-')[1];
      let currentSelectedDay = this.currentValue.slice(0, 10).split('-')[2];

      let formatedCurrentMonth = this.currentMonth + 1;
      if (isNotCurrentMonth) {
        if (currentValDay > 7) {
          formatedCurrentMonth = this.currentMonth - 0;
        } else {
          formatedCurrentMonth = this.currentMonth + 2;
        }
      }

      if (currentSelectedDay && currentSelectedDay.length > 1 && currentSelectedDay.at(0) === '0') {
        currentSelectedDay = currentSelectedDay.replace('0', '');
      }
      if (currentSelectedMonth && currentSelectedMonth.length > 1 && currentSelectedMonth.at(0) === '0') {
        currentSelectedMonth = currentSelectedMonth.replace('0', '');
      }

      return +currentSelectedYear === this.currentYear
        && +currentSelectedMonth === formatedCurrentMonth
        && +currentSelectedDay === currentValDay
    },

    getDays: function() {
      let daysArray = [];

      let currentCountDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      let firstDayName = new Date(this.currentYear, this.currentMonth, 1).getDay();
      let prevMonthDays = firstDayName > 1 ? firstDayName : firstDayName === 0 ? 7 : 0;
      
      if (prevMonthDays !== 0) {
        let prevCountDays = this.currentMonth !== 0 ? new Date(this.currentYear, this.currentMonth, 0).getDate() : new Date(this.currentYear - 1, 11, 0).getDate();

        for (let i = prevCountDays - (prevMonthDays - 2); i < prevCountDays + 1; i++) {
          daysArray.push({ number: i, isNotCurrentMonth: true });
        }
      }

      let newCurrentYear = new Date().getFullYear();
      let newCurrentMonth = new Date().getMonth();
      let currentDay = newCurrentYear === this.currentYear && newCurrentMonth === this.currentMonth ? new Date().getDate() : 0;

      for (let i = 1; i < currentCountDays + 1; i++) {
          daysArray.push({ number: i, isNotCurrentMonth: false, isCurrentDay: currentDay === i });
      }

      let lastDayName = new Date(this.currentYear, this.currentMonth + 1, 0).getDay();
      let nextMonthDays = lastDayName > 0 ? lastDayName : 7;

      if (nextMonthDays !== 0) {
        for (let i = 1; i <= 7 - nextMonthDays; i++) {
          daysArray.push({ number: i, isNotCurrentMonth: true });
        }
      }

      return daysArray;
    },

    onSelectDay: function(event) {
      let dayNum = +event.currentTarget.dataset.day + 1;
      let isMonthNotCurr = event.currentTarget.dataset.notcurrmonth;

      let currentSelectedDate;

      if (isMonthNotCurr) {
        if (dayNum > 7) {
          currentSelectedDate = new Date(this.currentYear, this.currentMonth - 1, dayNum);
        } else {
          currentSelectedDate = new Date(this.currentYear, this.currentMonth + 1, dayNum);
        }
      } else {
        currentSelectedDate = new Date(this.currentYear, this.currentMonth, dayNum);
      }

      this.$emit('onSelectDate', {
        dateISO: currentSelectedDate.toISOString()
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>