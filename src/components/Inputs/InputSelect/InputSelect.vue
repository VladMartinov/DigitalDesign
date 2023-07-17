<template>
  <div class="select-input__wrapper" v-click-outside="closeDropdown">
    <SelectButton :textPlaceholder="textPlaceholder" :hideButtonClear="hideClearButton" :isDisabled="isDisabled" :setValue="currentValText" :isActive="isOpened" @onSelectButtonClick="changeStateSelectInput" @onClearValue="clearValue" :key="currentValId"></SelectButton>

    <DropdownSelect :inputValueArray="inputValueArray" :isHidden="!isOpened" :isTag="isTag" :currentVal="currentValId" :isSelectDefValueById="selectDeffaultItem" @onValueSelected="selectValue"></DropdownSelect>
  </div>
</template>

<script>
import SelectButton from "@/components/Buttons/SelectButton/SelectButton"

import DropdownSelect from "@/components/Dropdown/DropdownMenu/DropdownSelect/DropdownSelect.vue"

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() {
        return []
      }
    },
    currentValId: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isTag: {
      type: Boolean,
      default: false
    },
    hideClearButton: {
      type: Boolean,
      default: false
    },
    selectDeffaultItem: {
      type: Number,
      default: NaN
    },
    textPlaceholder: {
      type: String,
    },
  },
  data() {
    return {
      isOpened: false,
    }
  },
  components: {
    SelectButton,
    DropdownSelect
  },
  computed: {
    currentValText() {
      if (!this.currentValId) return "";

      let currentItem = this.inputValueArray.find((value) => {
        return value._id === this.currentValId
      })

      return currentItem?.name ? '' + currentItem.name : "None"
    },

    isDeleted() {
      return this.currentValId === "DELETED";
    }
  },
  watch: {},
  methods: {
    changeStateSelectInput() {
      this.isOpened = !this.isOpened
    },

    selectValue(event) {
      this.closeDropdown()

      this.$emit("onValueSelected", {
        valId: event.value,
      })
    },

    clearValue() {
      this.closeDropdown()

      this.$emit("onValueSelected", {
        valId: "",
      })
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