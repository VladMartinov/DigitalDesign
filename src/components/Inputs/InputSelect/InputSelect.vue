<template>
  <!-- I am working on it -->
  <div class="select-input__wrapper" v-click-outside="closeDropdown">
    <SelectButton :isDisabled="isDisabled" :setValue="currentVal" :isActive="isOpened" :isProfileFilter="isProfile || isProfileSearch"  @onSelectButtonClick="changeStateSelectInput" @onClearValue="clearValue" :key="currentValId"></SelectButton>

    <DropdownSelect v-if="!isProfile" :inputValueArray="inputValueArray" :isHidden="!isOpened" @onValueSelected="selectValue"></DropdownSelect>
    <DropdownSelectProfile v-else :isNeedSearch="isProfileSearch" :inputValueArray="inputValueArray" :isHidden="!isOpened" :currentSelectedValId="this.currentValId" @onValueSelected="selectValue"></DropdownSelectProfile>
  </div>
</template>

<script>
import SelectButton from "@/components/Buttons/SelectButton/SelectButton"

import DropdownSelect from "@/components/Dropdown/DropdownMenu/DropdownSelect/DropdownSelect.vue"
import DropdownSelectProfile from "@/components/Dropdown/DropdownMenu/DropdownSelectProfile/DropdownSelectProfile.vue"

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() {
        return []
      }
    },
    isProfile: {
      type: Boolean,
      default: false
    },
    isProfileSearch: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      currentVal: "",
      currentValId: "",

      isOpened: false,
    }
  },
  components: {
    SelectButton,
    DropdownSelect, DropdownSelectProfile
  },
  computed: {},
  watch: {},
  methods: {
    changeStateSelectInput(event) {
      this.currentVal = event.value;
      this.isOpened = !this.isOpened

      //console.log("========== BUTTON ==========");
      //console.log("Current value: ", this.currentVal);
      //console.log("Current valueID: ", this.currentValId);
      //console.log("Current state: ", this.isOpened);
      //console.log("============================");
    },

    selectValue(event) {
      this.currentValId = event.value;
      this.currentVal = event.text;
      this.isOpened = false;

      //console.log("========== SELECT ==========");
      //console.log("Current value: ", this.currentVal);
      //console.log("Current valueID: ", this.currentValId);
      //console.log("Current state: ", this.isOpened);
      //console.log("Current valueArray: ", event.valueArray);
      //console.log("============================");

      this.$emit("onValueSelected", {
        valId: this.currentValId,
        val: this.currentVal,
        valArray: event.valueArray
      })
    },

    clearValue() {
      this.currentVal = "";
      this.currentValId = "";
      this.isOpened = false;

      this.$emit("onValueSelected", {
        valId: this.currentValId,
        val: this.currentVal
      })
      //console.log("========== CLEAR ==========");
      //console.log("Current value: ", this.currentVal);
      //console.log("Current valueID: ", this.currentValId);
      //console.log("Current state: ", this.isOpened);
      //console.log("===========================");
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