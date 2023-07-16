<template>
  <div class="input-date" v-click-outside="closeDatepicker">
    <div class="input-date__input" :class="{'active' : isActive, 'disabled' : isDisabled, 'error' : isError}" @click="onClickDatepickerInput">
      <p class="input-date__current-val text" :class="isCurrentValEmpty ? 'text_disabled' : 'text_prim'">{{ validInputText }}</p>
      
      <div class="input-date__datepicker-icon">
        <SvgIcon :name="'datepicker-icon'"></SvgIcon>
      </div>
    </div>

    <DropdownDatepicker :currentValue="currentValue" :isActive="isActive" @onSelectDate="onSelectedDate"></DropdownDatepicker>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

import DropdownDatepicker from "@/components/Dropdown/DropdownDatepicker/DropdownDatepicker.vue"

export default {
  props: {
    textPlaceholder: {
      type: String,
      default: "Поиск..."
    },
    currentValue: {
      type: String,
      default: ""
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  components: {
    SvgIcon,
    DropdownDatepicker
  },
  computed: {
    isCurrentValEmpty() {
      return this.currentValue === ""
    },

    validInputText() {
      if (this.isCurrentValEmpty) {
        return this.textPlaceholder
      } else {
        let dateArray = this.currentValue.slice(0, 10).split('-');

        return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
      }
    },
  },
  watch: {},
  methods: {
    onClickDatepickerInput: function() {
      if (!this.isDisabled){
        this.isActive = !this.isActive
      }
    },

    closeDatepicker: function() {
      if (this.isActive) {
        this.isActive = false
      }
    },

    onSelectedDate: function(event) {
      this.$emit('onSelectDate', { dateISO: event.dateISO })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>