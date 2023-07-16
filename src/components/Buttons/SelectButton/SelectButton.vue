<template>
  <div :class="wrapperClass" @click="onClick">
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
    },
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
        let newResultValue = "";
        let splitedName = this.value.split(' ');
        for (let index in splitedName) {
          if (index === "0") {
            newResultValue += `${splitedName[index]} `;
          } else {
            newResultValue += `${splitedName[index][0].toUpperCase()}.`;
          }
        }

        return newResultValue;
      } else {
        return this.value
      }
    },

    wrapperClass() {
      let newClass = 'button-select__wrapper'

      if (this.isDisabled) {
        newClass += " button-select__wrapper_disabled"
      } else if (this.isActive) {
        newClass += " button-select__wrapper_active"
      }

      return newClass
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
  watch: {
    setValue() {
      this.value = this.setValue;
    }
  },
  methods: {
    onClick(event) {
      if (this.isDisabled) return;

      let clearButtonEl = this.$el.querySelector('.button-select__button-clear');
      if (clearButtonEl && clearButtonEl.contains(event.target)) return;

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