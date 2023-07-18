<template>
  <div class="dropdown__wrapper" v-click-outside="closeDropdown">
    <BaseButton :class="validButtonClass" :nameIcon="'more-icon'" @onButtonClick="changeStateDropdown"
      :isDisabled="isDisabled" 
      :isActive="isActive"
    ></BaseButton>

    <DropdownMenu :buttonsArray="buttonsInitArray" :isHidden="!isActive" @onSelectAction="onSelectedAction"></DropdownMenu>
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
  computed: {
    validButtonClass() {
      return this.isPrim ? "button_small button__primary" : "button_small button__second"
    }
  },
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
    },

    onSelectedAction: function(event) {
      this.isActive = false;

      this.$emit('ActionSelected', {
        id: event.id
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>