<template>
  <div :class="dropdownClass">
    <button v-for="button in buttonArray" :key="button.text" :class="button.isAttention ? 'dropdown__button text text_error' : 'dropdown__button text text_prim'">
      {{ button.text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonArray: Array,
    isHidden: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown dropdown_hidden' : 'dropdown'
    },
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>