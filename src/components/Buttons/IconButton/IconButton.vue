<template>
  <button :class="className">
    <SvgIcon v-if="!hideIcon" :name="svgName"></SvgIcon>
  </button>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

export default {
  props: {
    svgName: {
      type: String,
      default: "default"
    },
    isPrim: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
  },
  components: {
    SvgIcon
  },
  computed: {
    className() {
      let className = 'button button_small'
      if (this.isPrim) {
        className += " button-icon__prim"
        if (this.isActive) {
          className += " button-icon__prim_active"
        }
      } else {
        className += " button-icon__second"
        if (this.isActive) {
          className += " button-icon__second_active"
        }
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