<template>
<section class="empty-filter">
  <div class="empty-filter__wrapper">
    <p class="text text_black">
      {{ text }}
    </p>
  </div>
</section>
</template>

<script>
export default {
  props: {
    inputText: {
      type: String,
      default: "Empty filter"
    }
  },
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