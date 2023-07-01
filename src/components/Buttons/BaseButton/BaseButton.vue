<template>
  <div :class="[{'active' : isActive}, 'button']" @click="onClick">
    <p v-if="!hideText && title !== ''" :class="validTextClassName">{{ title }}</p>

    <SvgIcon v-if="!hideIcon && nameIcon !== ''" :name="nameIcon" :flipImg="isActive"></SvgIcon>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    nameIcon: {
      type: String,
      default: ""
    },
    isDisabled: {
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
    },
    isActive: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
    }
  },
  components: { SvgIcon },
  computed: {
    validWrapperClassName() {
      let newClassName = "button"

      if (this.isSmall || (this.hideIcon !== true && this.hideText === true) || this.title === "") {
        newClassName += " button_small"
      }

      if (this.isNav) {
        newClassName += " button__nav"

        if (this.isActive) {
          newClassName += " button__nav_active"
        }
      } else if (this.isPrim) {
        newClassName += " button__primary"

        if (this.isActive) {
          newClassName += " button__primary_active"
        }
      } else {
        newClassName += " button__second"

        if (this.isActive) {
          newClassName += " button__second_active"
        }
      }

      return newClassName
    },

    validTextClassName() {
      let newClassName = "button__text text"

      if (this.isDisabled) {
        newClassName += " text_disabled"
      }

      return newClassName
    }
  },
  watch: {},
  methods: {
    onClick: function(event) {
      this.$emit("onButtonClick", {
        dataValue: event.currentTarget.dataset
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>