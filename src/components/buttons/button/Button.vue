<template>
<button :class="className" :disabled="isDisabled">{{title}}</button>
</template>

<script>
export default {
  props: {
    title: String,
    isSmall: {
      type: Boolean,
      default: false
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
  components: {},
  computed: {
    className() {
      let className = "button"
      if (this.isSmall) {
        className += " button_small"
      }
      if (this.isPrim) {
        className += " button__primary text"
      } else {
        className += " button__second text text_prim"
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