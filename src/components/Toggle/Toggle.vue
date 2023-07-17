<template>
  <label class="toggle" :class="{ 'active' : currentValue }" :for="name">
    <input class="visually-hidden" type="checkbox" :id="name" :value="currentValue" @click="onToggleClick"/>
  </label>
</template>

<script>
export default {
  props: {
    currentValue: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    onToggleClick: function() {
      this.$emit("onToggle", {
        value : !this.currentValue
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>