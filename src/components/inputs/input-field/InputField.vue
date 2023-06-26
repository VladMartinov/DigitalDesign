<template>
  <input class="input-field text text_prim" type="text" :disabled="isDisabled" placeholder="Введите текст...">
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>