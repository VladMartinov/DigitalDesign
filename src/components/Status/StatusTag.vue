<template>
  <span
    :class="'task-content__status status-item ' + ('status-item_' + tagStatus + ' ') + 'text'"
    >
    {{tagText}}
  </span>
</template>

<script>
export default {
  props: {
    tagText: {
      type: String,
      default: "Tag"
    }, 
    tagStatus: {
      type: String,
      default: "draft"
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