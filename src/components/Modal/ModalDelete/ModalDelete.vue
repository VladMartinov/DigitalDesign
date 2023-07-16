<template>
  <div class="modal-delete">
    <div class="modal-delete__wrapper">
      <h2 class="modal-delete__title text text_h2 text_prim">Удаление</h2>
      <span class="modal-delete__info text text_prim">Вы уверены что хотите <span class="text_error">удалить</span> {{ typeItem }} «{{ title }}»?</span>
      
      <div class="modal-delete__buttons">
        <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onClick(false)"></BaseButton>

        <BaseButton class="button__primary" :title="'Да'" @onButtonClick="onClick(true)"></BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue'

export default {
  props: {
    title: {
      type: String,
      default: "Название"
    },
    typeItem: {
      type: String,
      default: ""
    },
  },
  data() {
    return {}
  },
  components: {
    BaseButton
  },
  computed: {},
  watch: {},
  methods: {
    onClick: function(answer) {
      this.$emit('onSelectedAction', {
        isAccept : answer
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>