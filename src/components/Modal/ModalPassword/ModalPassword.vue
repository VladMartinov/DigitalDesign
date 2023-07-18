<template>
  <div class="modal-password" v-if="isShowModal">
    <div class="modal-password__wrapper">
      <h2 class="modal-password__title text text_h2 text_prim">Изменение пароля</h2>

      <div class="modal-password__rows-wrapper" v-if="!isConfirmState">
        <div class="modal-password__row" v-if="isError">
          <span class="modal-password__input-title text text_disabled"></span>

          <span class="text text_error">Пароли не совпадают или имеют малую длинну!</span>
        </div>

        <div class="modal-password__row">
          <span class="modal-password__input-title text text_disabled">Новый пароль<span class="text_error">*</span></span>

          <InputPassword maxlength="15" placeholder="Новый пароль"  :currentVal="item.password" :isError="isError" @onValueChanged="item.password = $event.value"></InputPassword>
        </div>

        <div class="modal-password__row">
          <span class="modal-password__input-title text text_disabled"></span>

          <InputPassword maxlength="15" placeholder="Повторите новый пароль" :currentVal="item.confirmPassword" :isError="isError" @onValueChanged="item.confirmPassword = $event.value"></InputPassword>
        </div>
      </div>
      <div class="modal-password__rows-wrapper" v-else>
        <span class="text text_prim">Вы уверены, что хотите изменить пароль?</span>
      </div>

      <div class="modal-password__buttons">
        <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onClick(false)"></BaseButton>

        <BaseButton class="button__primary" :title="validButtonText" :isDisabled="isFormEmpty && !isConfirmState" @onButtonClick="onClick(true)"></BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue'

import InputPassword from '@/components/Inputs/InputPassword/InputPassword.vue'

export default {
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      item: {
        password: "",
        confirmPassword: ""
      },

      isConfirmState: false,
      isError: false,
    }
  },
  components: {
    BaseButton,
    InputPassword
  },
  computed: {
    validButtonText() {
      if (this.isConfirmState) {
        return "Да, продолжить"
      } else {
        return "Изменить пароль"
      }
    },

    isFormEmpty() {
      return this.item.password === "" || this.item.confirmPassword === ""
    },

    validFormData() {
      return this.item.password === this.item.confirmPassword
    }
  },
  watch: {},
  methods: {
    onClick: function(answer) {
      if ( answer && this.isConfirmState) {
        
        this.$emit("setNewPassword", {
          password: this.item.password
        })
        
      } else if ( answer && !this.isConfirmState && !this.isFormEmpty && this.validFormData && this.item.password.length > 2 ) {
        this.isConfirmState = true;

        if (this.isError) {
          this.isError = false
        }
      } else if ( !answer && this.isConfirmState ) {
        this.isConfirmState = false;

        this.item.password = "";
        this.item.confirmPassword = "";
      } else if ( (!this.validFormData || this.isFormEmpty || this.item.password.length < 3) && answer ) {
        this.isError = true
      } else {
        if (this.isError) {
          this.isError = false
        }
        this.$emit("CloseModal", {})
      }
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>