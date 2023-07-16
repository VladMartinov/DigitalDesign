<template>
  <label class="radio" :class="{ 'active' : currentValue === value }" :for="unicName">
    <input v-bind="$attrs" class="visually-hidden" type="radio" :id="unicName" :value="value" @click="onChangeValue" />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    currentValue: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    unicName: {
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
    onChangeValue: function(event) {
      this.$emit("onRadioClick", {
        value: event.target.value
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>