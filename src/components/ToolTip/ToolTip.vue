<template>
  <div class="tooltip author-tooltip" v-if="tooltipAuthorActive">
    <span class="text text_prim">text</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
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
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>