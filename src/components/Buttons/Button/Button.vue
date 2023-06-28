<template>
  <button :class="className">{{ textToRender }}</button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Button"
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    isPrim: {
      type: Boolean,
      default: false
    },
    hideText: {
      type: Boolean,
      default: false
    },
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
    },

    textToRender() {
      return this.hideText ? "" : this.title
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>