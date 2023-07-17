<template>
  <div class="select-input-profile__wrapper" v-click-outside="closeDropdown">
    <SelectButton :textPlaceholder="textPlaceholder" :hideButtonClear="hideClearButton" :isDisabled="isDisabled" :setValue="currentValText" :isActive="isOpened" :isProfileFilter="true" @onSelectButtonClick="changeStateSelectInput" @onClearValue="clearValue" :key="currentValId"></SelectButton>

    <DropdownSelectProfile :isNeedSearch="isSearch" :inputValueArray="inputValueArray" :isHidden="!isOpened" :currentSelectedValId="currentValId" @onValueSelected="selectValue"></DropdownSelectProfile>
  </div>
</template>

<script>
import SelectButton from "@/components/Buttons/SelectButton/SelectButton"

import DropdownSelectProfile from "@/components/Dropdown/DropdownMenu/DropdownSelectProfile/DropdownSelectProfile.vue"

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() {
        return []
      }
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    hideClearButton: {
      type: Boolean,
      default: false
    },
    currentValId: {
      type: String,
      default: ""
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
    DropdownSelectProfile
  },
  computed: {
    currentValText() {
      if (!this.currentValId) return ""

      let currentItem = this.inputValueArray.find((value) => {
        return value._id === this.currentValId
      })

      return currentItem?.name ? currentItem.name : "Не назначен"
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