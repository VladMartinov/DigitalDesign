<template>
  <div class="dropdown-button" v-click-outside="closeDropdown">
    <BaseButton :title="title" :nameIcon="'arrow-bottom'" 
      :isActive="isActive" :isPrim="isPrim" :isDisabled="isDisabled" 
      :hideText="hideText" :hideIcon="hideIcon" 
      @onButtonClick="changeStateDropdown"></BaseButton>

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
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: "Button"
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isPrim: {
      type: Boolean,
      default: false
    },
    hideText: {
      type: Boolean,
      default: false
    },
    hideIcon: {
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
    textToRender() {
      return this.hideText ? "" : this.title
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
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>