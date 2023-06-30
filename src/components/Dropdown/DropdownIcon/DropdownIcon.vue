<template>
  <div class="dropdown__wrapper" v-click-outside="closeDropdown">
    <BaseButton :nameIcon="'more-icon'" @onButtonClick="changeStateDropdown"
      :isDisabled="isDisabled" 
      :isPrim="isPrim" 
      :isActive="isActive"
    ></BaseButton>

    <DropdownMenu :buttonsArray="buttonsInitArray" :isHidden="!isActive"></DropdownMenu>
  </div>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"
import DropdownMenu from "@/components/Dropdown/DropdownMenu/DropdownMenu.vue"

export default {
  props: {
    buttonsInitArray: {
      type: Array,
      default: []
    },
    isPrim: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false,
    }
  },
  components: {BaseButton, DropdownMenu},
  computed: {},
  watch: {},
  methods: {
    changeStateDropdown: function() {
      if (!this.isDisabled){
        this.isActive = !this.isActive
      }
    },

    closeDropdown: function() {
      if (this.isActive) {
        this.isActive = !this.isActive
      }
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>