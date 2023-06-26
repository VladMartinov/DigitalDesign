<template>
  <button :class="className" :disabled="isDisabled">
    <SvgIcon :name="svgName"></SvgIcon>
  </button>
</template>

<script>
import SvgIcon from "@/components/svg-icon/SvgIcon.vue"

export default {
  props: {
    svgName: String,
    isPrim: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SvgIcon
  },
  computed: {
    className() {
      let className = 'button button_small'
      if (this.isPrim) {
        className += " button__icon_prim"
      } else {
        className += " button__icon_second"
      }
      if (this.isActive) {
        className += " button__icon_active"
      }
      return className
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>