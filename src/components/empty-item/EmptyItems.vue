<template>
<section class="empty-items">
  <div class="container container_full-height">
    <div class="empty-items__wrapper">
      <p class="empty-items__text text text_black">
        {{ text }}
      </p>

      <Button :isPrim="true" :title="'Добавить'"></Button>
    </div>
  </div>
</section>
</template>

<script>
import Button from "@/components/buttons/button/Button.vue"

export default {
  props: ['typeItem'],
  data() {
    return {
      type: this.typeItem
    }
  },
  components: {
    Button
  },
  computed: {
    text() {
      if (this.type === "project") {
        return "Не создан ни один проект"
      } else if (this.type === "task") {
        return "Не создана ни одина задача"
      } else {
        return "Unknown type"
      }
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>