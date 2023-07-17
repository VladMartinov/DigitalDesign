<template>
  <div class="empty-items__wrapper">
    <p class="empty-items__text text text_black">
      {{ text }}
    </p>

    <BaseButton v-if="!isUser || (isUser && isAdmin)" class="button__primary" :title="'Добавить'"></BaseButton>
  </div>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

export default {
  inheritAttrs: false,
  props: {
    typeItem: {
      type: String,
      default: "Empty item"
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: this.typeItem
    }
  },
  components: {
    BaseButton
  },
  computed: {
    text() {
      if (this.type === "project") {
        return "Не создан ни один проект"
      } else if (this.type === "task") {
        return "Не создана ни одина задача"
      } else if (this.type === "user") {
        return "Нет ни одного пользователя"
      } else {
        return "Unknown type"
      }
    },

    isUser() {
      return this.type === "user";
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>