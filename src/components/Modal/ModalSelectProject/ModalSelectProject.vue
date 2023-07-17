<template>
  <div class="modal-select">
    <div class="modal-select__wrapper">
      <h2 class="modal-select__title text text_h2 text_prim">Перемещение в проект</h2>

      <div class="modal-select__dropdown">
        <InputSelect :currentValId="selectedValue" :hideClearButton="true" :inputValueArray="inputUsersData" :textPlaceholder="'Выберите проект...'" @onValueSelected="selectedValue = $event.valId"></InputSelect>
      </div>
      
      <div class="modal-select__buttons">
        <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onClick(false)"></BaseButton>

        <BaseButton class="button__primary" :title="'Переместить'" @onButtonClick="onClick(true)"></BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue';
import InputSelect from '@/components/Inputs/InputSelect/InputSelect.vue';

export default {
  props: {
    inputUsersData: {
      type: [],
      default: function() {
        return [];
      }
    },
    currentProject: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectedValue: this.currentProject
    }
  },
  components: {
    BaseButton, InputSelect
  },
  computed: {},
  watch: {},
  methods: {
    onClick: function(answer) {
      this.$emit('onSelectProject', {
        isAccept : answer,
        id: this.selectedValue
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>