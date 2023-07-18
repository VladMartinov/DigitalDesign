<template>
  <div :class="wrapperClass" @click="onClick">
    <p :class="textClass">{{ valueToRender }}</p>

    <button class="button-multiselect__button-clear" :disabled="isDisabled" type="button" @click="ClearSelectedValue">
      <SvgIcon :size="{ width: 16, height: 16 }" :name="'clear-icon'"></SvgIcon>
    </button>

    <button class="button-multiselect__button-open" :disabled="isDisabled" type="button">
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
    textPlaceholder: {
      type: String,
      default: "Выберите значение..."
    },
    isUsersFilter: {
      type: Boolean,
      default: false
    },
    setTotalValue: {
      type: Number,
      default: 0
    },
    selectedUsers: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {}
  },
  components: {SvgIcon},
  computed: {
    valueToRender() {
      if (this.selectedUsers.length === 0 && this.setTotalValue === 0) {
        return this.textPlaceholder;
      } else if (this.isUsersFilter) {
        let newResultValue = "";
        
        for (let i = 0; i < this.selectedUsers.length; i++) {
          if (i !== 0) {
            newResultValue += ", "
          }

          let splitedName = this.selectedUsers[i].split(' ')
          for (let index in splitedName) {
            if (index === "0") {
              newResultValue += `${splitedName[index]} `
            } else {
              newResultValue += `${splitedName[index][0].toUpperCase()}.`
            }
          }
        }

        return newResultValue
      } else {
        let newVal = "Выбрано: " + this.setTotalValue;

        return newVal;
      }
    },

    wrapperClass() {
      let newClass = 'button-multiselect__wrapper';

      if (this.isDisabled) {
        newClass += " button-multiselect__wrapper_disabled";
      } else if (this.isActive) {
        newClass += " button-multiselect__wrapper_active";
      }

      return newClass;
    },

    textClass() {
      if ((this.selectedUsers.length === 0 && this.setTotalValue === 0) || this.isDisabled) {
        return "button-multiselect__value-selected text text_disabled";
      } else {
        return "button-multiselect__value-selected text text_prim";
      }
    },

    isEmpty() {
      return this.selectedUsers.length === 0;
    }
  },
  watch: {},
  methods: {
    onClick(event) {
      if (this.isDisabled) return;

      let clearButtonEl = this.$el.querySelector('.button-multiselect__button-clear');
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