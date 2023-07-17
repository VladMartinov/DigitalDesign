<template>
  <div class="textarea__wrapper" :class="{ 'min-height' : noInitHeight }">
    <textarea class="text text_prim" v-model="currentValue" name="test" @input="onChange" v-bind="$attrs"></textarea>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    noInitHeight: {
      type: Boolean,
      default: false
    },
    initValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return { 
      currentValue: "",
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.currentValue = this.initValue;
  },
  watch: {
    initValue() {
      this.currentValue = this.initValue;
    }
  },
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