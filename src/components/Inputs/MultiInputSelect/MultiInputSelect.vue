<template>
  <div class="select-input__wrapper" v-click-outside="closeDropdown">
    <MultiSelectButton v-if="!isUsers" :textPlaceholder="textPlaceholder" :isDisabled="isDisabled" :setTotalValue="totalSelected" :isActive="isOpened" @onSelectButtonClick="changeStateSelectInput" @onClearValue="clearValue" :key="totalSelected"></MultiSelectButton>
    <MultiSelectButton v-else :textPlaceholder="textPlaceholder" :isDisabled="isDisabled" :isActive="isOpened" :setTotalValue="totalSelected" :isUsersFilter="isUsers" :selectedUsers="selectedNames" @onSelectButtonClick="changeStateSelectInput" @onClearValue="clearValue" :key="totalSelected"></MultiSelectButton>

    <DropdownMultiSelect v-if="!isUsers" :inputValueArray="inputValueArray" :selectedValues="currentValue" :isHidden="!isOpened" @onMultiValueSelected="onValuesSelected"></DropdownMultiSelect>
    <DropdownMultiSelectProfile v-else :inputValueArray="inputValueArray" :isHidden="!isOpened" :selectedValues="currentValue" @onMultiValueSelected="onValuesSelected"></DropdownMultiSelectProfile>
  </div>
</template>

<script>
import MultiSelectButton from "@/components/Buttons/MultiSelectButton/MultiSelectButton"

import DropdownMultiSelect from "@/components/Dropdown/DropdownMenu/DropdownMultiSelect/DropdownMultiSelect.vue"
import DropdownMultiSelectProfile from "@/components/Dropdown/DropdownMenu/DropdownMultiSelectProfile/DropdownMultiSelectProfile.vue"

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() {
        return []
      }
    },
    currentValue: {
      type: Array,
      default: function() {
        return []
      }
    },
    isUsers: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
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
    MultiSelectButton,
    DropdownMultiSelect, DropdownMultiSelectProfile
  },
  computed: {
    totalSelected() {
      return this.currentValue.length
    },

    selectedNames() {
      let selectedValNames = [];

      this.inputValueArray.map((value) => {
        if (this.currentValue.includes(value._id)) {
          selectedValNames.push(value.name)
        }
      })

      return selectedValNames
    }
  },
  watch: {},
  methods: {
    changeStateSelectInput() {
      this.isOpened = !this.isOpened
    },

    onValuesSelected(event) {
      let newSelectedValId = this.currentValue.map((value) => { return value; });

      if (event.isInArray) {
        newSelectedValId = this.currentValue.filter((value) => value !== event.value)
      } else {
        newSelectedValId.push(event.value);
      }

      this.$emit("onValueSelected", {
        valArray: newSelectedValId,
      })
    },

    clearValue() {
      this.$emit("onValueSelected", {
        valArray: [],
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