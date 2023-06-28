<template>
  <div :class="dropdownClass">
    <button v-for="button in buttonsItems" :key="button.text" :class="button.isAttention ? 'dropdown__button text text_error' : 'dropdown__button text text_prim'">
      {{ button.text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonsArray: {
      type: Array,
      default: function() { 
        return []
      }
    },
    isHidden: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      buttonsItems: [],
    }
  },
  components: {},
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown dropdown_hidden' : 'dropdown'
    },
  },
  watch: {},
  mounted() {
    this.buttonsItems = this.buttonsArray.map(buttonItem => {
        return Object.assign({}, buttonItem)
      })
  },
  methods: {}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>