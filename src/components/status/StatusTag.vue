<template>
  <span
    :class="'task-content__status status-item ' + ('status-item_' + status + ' ') + 'text'"
    >
    {{text}}
  </span>
</template>

<script>
export default {
  props: ['tagText', 'tagStatus'],
  data() {
    return {
      text: this.tagText,
      status: this.tagStatus
    }
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