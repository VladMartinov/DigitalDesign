<template>
  <div class="modal-confirm">
    <div class="modal-confirm__wrapper">
      <h2 class="modal-confirm__title text text_h2 text_prim">{{ title }}</h2>
      <span class="modal-confirm__info text text_prim">{{ text }}</span>
      
      <div class="modal-confirm__buttons">
        <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onClick(false, false)"></BaseButton>

        <BaseButton class="button__primary" v-if="!minAnswer" :title="'Нет, не сохранять'" @onButtonClick="onClick(true, false)"></BaseButton>

        <BaseButton class="button__primary" :title="confirmButtonText" @onButtonClick="onClick(true, true)"></BaseButton>
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
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    confirmButtonText: {
      type: String,
      default: ""
    },
    minAnswer: {
      type: Boolean,
      default: false
    }
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
    onClick: function(answer, answerSecond) {
      this.$emit('onSelectedAction', {
        isAccept : answer,
        isSave: answerSecond
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>