<template>
  <div class="dropdown-button">
    <div :class="buttonClassName" v-on:click="hideDropdown">
      <p :class="textClassName" :disabled="isDisabled">{{textToRender}}</p>
      <SvgIcon v-if="!hideIcon" :name="'arrow-bottom'" :flipImg="isActive"></SvgIcon>
    </div>

    <DropdownMenu :buttonsArray="buttonsInitArray" :isHidden="!isActive"></DropdownMenu>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"
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
  components: {SvgIcon, DropdownMenu},
  computed: {
    buttonClassName() {
      let className = "dropdown-button__wrapper"
      if (this.isPrim) {
        className += " dropdown-button__primary"
        
        if (this.isActive) {
          className += " dropdown-button__primary_active"
        }
        if (this.isDisabled) {
          className += " dropdown-button__primary_disabled"
        }
      } else {
        className += " dropdown-button__second"

        if (this.isActive) {
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
    },

    textToRender() {
      return this.hideText ? "" : this.title
    }
  },
  watch: {},
  methods: {
    hideDropdown: function() {
      if (!this.isDisabled){
        this.isActive = !this.isActive
      }
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>