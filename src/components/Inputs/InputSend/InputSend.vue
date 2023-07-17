<template>
  <div class="input-send">
    <div class="input-send__input-area">
      <Textarea :noInitHeight="true" :initValue="currentValue" v-bind="$attrs" rows="1" @onValueChange="currentValue = $event.value"></Textarea>
    </div>

    <BaseButton v-if="isUpdate" class="button__second button_small" :nameIcon="'close-icon'" @onButtonClick="CloseUpdate"></BaseButton>

    <BaseButton class="button__primary button_small" :nameIcon="'send-icon'" :isDisabled="currentValue === ''" @onButtonClick="SendNewChildComment"></BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue'
import Textarea from '../Textarea/Textarea.vue'

export default {
  inheritAttrs: false,
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    },
    startValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentValue: this.startValue
    }
  },
  components: {
    BaseButton, Textarea
  },
  computed: {},
  watch: {},
  methods: {
    SendNewChildComment: function() {
      if (this.currentValue === '') return;

      this.$emit('onSendValue', {
        value: this.currentValue
      })

      this.currentValue = '';
    },

    CloseUpdate: function() {
      this.$emit('onCloseUpdate', {});

      this.currentValue = '';
    }
  },

}
</script>

<style lang='scss'>
@import './index.scss';
</style>