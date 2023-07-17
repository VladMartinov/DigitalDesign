<template>
  <div class="select-with-btn__wrapper" v-click-outside="closeDropdown">
    <div v-if="!isUsers" :class="inputWrapperClass" @click="changeStateDropdown">
      
      <p :class="textClass">{{ currentValText }}</p>

      <button class="button-select__button-open" :disabled="isDisabled" type="button">
        <SvgIcon :name="'arrow-bottom'" :flipImg="isOpened"></SvgIcon>
      </button>

      <DropdownSelect :inputValueArray="inputValueArray" :isHidden="!isOpened" :isProject="isProject" :isTask="isTask" @onValueSelected="selectValue"></DropdownSelect>
    </div>

    <div class="button-type-order" @click="selectOrder">
      <SvgIcon name="filter-arrow-icon" :flipImg="!isDescending"></SvgIcon>
    </div>
  </div>
</template>

<script>
import DropdownSelect from "@/components/Dropdown/DropdownMenu/DropdownSelect/DropdownSelect.vue"
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() {
        return []
      }
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    hideDropdown: {
      type: Boolean,
      default: false
    },
    currFilterObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isProject: {
      type: Boolean,
      default: false
    },
    isUsers: {
      type: Boolean,
      default: false
    },
    isTask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpened: false,
    }
  },
  components: {
    SvgIcon, DropdownSelect
  },
  computed: {
    inputWrapperClass() {
      let newClass = 'button-sort__wrapper'

      if (this.isDisabled) {
        newClass += " button-sort__wrapper_disabled"
      } else if (this.isOpened) {
        newClass += " button-sort__wrapper_active"
      }

      return newClass
    },

    currentValText() {
      let currentVal = this.inputValueArray.find((item) => {
        return item._id === this.currFilterObj.sortId
      })

      return currentVal?.name ? currentVal.name : "None"
    },

    textClass() {
      return this.isDisabled ? "button-sort__value text text_disabled" : "button-sort__value text text_prim"
    },

    isDescending() {
      return this.currFilterObj.orderType === 'desc'
    },
  },
  watch: {},
  methods: {

    selectValue(event) {
      this.$emit("onSortedValueSelected", {
        valId: event.value,
      })
    },

    selectOrder() {
      this.$emit("onOrderValueSelected", {
      })
    },

    changeStateDropdown: function() {
      this.isOpened = !this.isOpened
    },

    closeDropdown: function() {
      this.isOpened = false;
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>