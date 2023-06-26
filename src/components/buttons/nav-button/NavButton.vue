<template>
  <button :class="className">
            {{ title }}
          </button>
</template>

<script>
export default {
  props: {
    title: String,
    isActive: Boolean
  },
  components: {},
  computed: {
    className() {
      return this.isActive ? 'header__item button button__nav button__nav_active text' : 'header__item button button__nav text';
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>