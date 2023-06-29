<template>
  <button :class="className" @click="onClickButton">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type:String,
      default: "Button"
    },
    typePage: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  computed: {
    className() {
      return this.isActive ? 'header__item button button__nav button__nav_active text' : 'header__item button button__nav text';
    }
  },
  watch: {},
  methods: {
    onClickButton() {
      this.$emit("onNavButtonClick", {
        page: this.typePage
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>