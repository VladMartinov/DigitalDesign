<template>
<section class="empty-filter">
  <div class="container container_full-height">
    <div class="empty-filter__wrapper">
      <p class="text text_black">
        {{ text }}
      </p>
    </div>
  </div>
</section>
</template>

<script>
export default {
  props: ['inputText'],
  data() {
    return {
      text: this.inputText
      }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import "./index";
</style>