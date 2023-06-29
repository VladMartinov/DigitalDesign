<template>
  <div class="dropdown__wrapper">
    <IconButton :svgName="'more-icon'" v-on:click.native="hideDropdown" 
      :isDisabled="isDisabled" 
      :isPrim="isPrim" 
      :isActive="isActive"
    ></IconButton>

    <DropdownMenu :buttonsArray="buttonsInitArray" :isHidden="!isActive"></DropdownMenu>
  </div>
</template>

<script>
import IconButton from "@/components/Buttons/IconButton/IconButton.vue"
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
  components: {IconButton, DropdownMenu},
  computed: {},
  watch: {},
  methods: {
    hideDropdown: function() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>