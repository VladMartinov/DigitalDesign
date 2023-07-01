<template>
  <div class="textarea__wrapper">
    <textarea class="text text_prim" v-model="currentValue" name="test" @input="onChange" v-bind="$attrs"></textarea>
  </div>
</template>

<script>


export default {
  inheritAttrs: false,
  props: {},
  data() {
    return { 
      currentValue: ""
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    onChange: function(event) {
      event.target.style.height = "auto"

      let scrollHeight = event.target.scrollHeight;
      event.target.style.height = `${scrollHeight}px`

      this.$emit("onValueChange", {
        value: this.currentValue
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>