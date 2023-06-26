<template>
  <div class="dropdown-button">
    <div :class="buttonClassName" v-on:click="hideDropdown">
      <p :class="textClassName" :disabled="isDisabled">{{title}}</p>
      <SvgIcon :name="'arrow-bottom'"></SvgIcon>
    </div>

    <DropdownMenu :buttonArray="buttons" :isHidden="isHidden"></DropdownMenu>
  </div>
</template>

<script>
import SvgIcon from "@/components/svg-icon/SvgIcon.vue"
import DropdownMenu from "@/components/dropdown/dropdown-menu/DropdownMenu.vue"

export default {
  props: {
    buttonArray: Array,
    title: String,
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isPrim: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buttons: this.buttonArray,
      isDisabled: false,
      isHidden: true,
    }
  },
  components: {SvgIcon, DropdownMenu},
  computed: {
    buttonClassName() {
      let className = "dropdown-button__wrapper"
      if (this.isPrim) {
        className += " dropdown-button__primary"
        
        if (!this.isHidden) {
          className += " dropdown-button__primary_active"
        }
        if (this.isDisabled) {
          className += " dropdown-button__primary_disabled"
        }
      } else {
        className += " dropdown-button__second"

        if (!this.isHidden) {
          className += " dropdown-button__second_active"
        }
        if (this.isDisabled) {
          className += " dropdown-button__second_disabled"
        }
      }

      return className
    },
    textClassName() {
      let className = "dropdown-button__text"
      if (this.isPrim) {
        className += " text"
      } else {
        className += " text text_prim"
      }
      if (this.isDisabled) {
        className += " text_disabled"
      }

      return className
    }
    },
  watch: {},
  methods: {
    hideDropdown: function() {
      if (!this.isDisabled){
        this.isHidden = !this.isHidden
      }
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>