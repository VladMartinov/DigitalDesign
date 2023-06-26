<template>
  <div class="dropdown__wrapper">
    <IconButton :svgName="'more-icon'" v-on:click.native="hideDropdown" 
      :isDisabled="isDisabled" 
      :isPrim="isPrim" 
      :isActive="!isHidden"
    ></IconButton>

    <DropdownMenu :buttonArray="buttons" :isHidden="isHidden"></DropdownMenu>
  </div>
</template>

<script>
import IconButton from "@/components/buttons/icon-button/IconButton.vue"
import DropdownMenu from "@/components/dropdown/dropdown-menu/DropdownMenu.vue"

export default {
  props: {
    buttonArray: Array,
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
      buttons: this.buttonArray,
      isHidden: true,
    }
  },
  components: {IconButton, DropdownMenu},
  computed: {},
  watch: {},
  methods: {
    hideDropdown: function() {
      this.isHidden = !this.isHidden
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>