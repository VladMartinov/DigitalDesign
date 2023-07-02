<template>
  <div :class="wrapperClass" v-on:click="onClick">
    <p :class="textClass">{{ valueToRender }}</p>

    <button v-if="!isEmpty && !hideButtonClear" class="button-select__button-clear" :disabled="isDisabled" type="button" @click="ClearSelectedValue">
      <SvgIcon :size="{ width: 16, height: 16 }" :name="'clear-icon'"></SvgIcon>
    </button>

    <button class="button-select__button-open" :disabled="isDisabled" type="button">
      <SvgIcon :name="'arrow-bottom'" :flipImg="isActive"></SvgIcon>
    </button>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon"

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    hideButtonClear: {
      type: Boolean,
      default: false
    },
    setValue: {
      type: String,
      default: ""
    },
    textPlaceholder: {
      type: String,
      default: "Выберите значение..."
    },
    isProfileFilter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.setValue,
    }
  },
  components: {SvgIcon},
  computed: {
    valueToRender() {
      if (this.value === "") {
        return this.textPlaceholder
      } else if (this.isProfileFilter) {
        let newValArray = this.value.split(' ')
        let newVal = newValArray[0] + " " + newValArray[1][0] + '.' + newValArray[2][0] + '.'
        
        return newVal
      } else {
        return this.value
      }
    },

    wrapperClass() {
      if (this.isDisabled) {
        return "button-select__wrapper button-select__wrapper_disabled"
      } else if (this.isActive) {
        return "button-select__wrapper button-select__wrapper_active"
      } else {
        return "button-select__wrapper"
      }
    },

    textClass() {
      if (this.value === "" || this.isDisabled) {
        return "button-select__value-selected text text_disabled"
      } else {
        return "button-select__value-selected text text_prim"
      }
    },

    isEmpty() {
      return this.value === ""
    }
  },
  watch: {},
  methods: {
    onClick() {
      if (this.isDisabled) {
        return
      }

      this.$emit("onSelectButtonClick", {
        value: this.value
      })
    },

    ClearSelectedValue() {
      this.$emit("onClearValue", {})
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>