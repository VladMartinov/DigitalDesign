<template>
  <section class="section-login">
    <div class="section-login__wrapper">
      <div class="login__title">
        <h2 class="text text_prim text_h2">Вход</h2>
      </div>

      <div class="login__rows-wrapper">
        <div class="login__error-message" v-if="isErrorAuth">
          <span class="text text_error">Неправильный логин или пароль.</span>
        </div>

        <div class="login__row">
          <div class="login__input-title">
            <span class="text text_prim">
              Логин<span class="text_error">*</span>
            </span>
          </div>

          <InputPassword :isError="isErrorAuth" :isHideIcon="true" :currentVal="user.login" @onValueChanged="user.login = $event.value"></InputPassword>
        </div>
        
        <div class="login__row">
          <div class="login__input-title">
            <span class="text text_prim">
              Пароль<span class="text_error">*</span>
            </span>
          </div>

          <InputPassword :isError="isErrorAuth" :currentVal="user.password" @onValueChanged="user.password = $event.value"></InputPassword>
        </div>
      </div>

      <div class="login__button">
        <BaseButton class="button__primary" :title="'Войти'" :isDisabled="isFormDataEmpty" @onButtonClick="onSubmitForm"></BaseButton>
      </div>
    </div>

    <LoadingState></LoadingState>
  </section>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue';
import InputPassword from '../Inputs/InputPassword/InputPassword.vue';

import LoadingState from '../LoadingState/LoadingState.vue';

import { mapActions } from 'vuex';

export default {
  props: {},
  data() {
    return {
      user: {
        "login": "",
        "password": ""
      },

      isShowPassword: false,
      isErrorAuth: false
    }
  },
  components: {
    BaseButton, InputPassword,
    LoadingState,
  },
  computed: {
    isFormDataEmpty() {
      return this.user.login === "" || this.user.password === "";
    },

    iconInputName() {
      return this.isShowPassword ? "eye-open-icon" : "eye-close-icon";
    }
  },
  watch: {},
  methods: {
    ...mapActions(['setToken', 'setRole', 'setLoadingState']),
    ...mapActions(['setLoadingState']),

    onChangeShowPassword: function() {
      this.isShowPassword = !this.isShowPassword;
    },

    onSubmitForm: function() {
      if (this.isFormDataEmpty) return;
      if (this.isErrorAuth) this.isErrorAuth = false;

      this.setLoadingState(true)

      this.$api.post.login(this.user)
        .then(async (response) => {
          let token = response.data.token;
          let role = await this.$api.get.currentUser(token).then(({data}) => {
            return data.roles[0];
          }).catch(e => {
            console.log(e);
            return "";
          })

          this.setRole(role);
          this.setToken(response.data.token);

          this.$router.push({ name: 'PageProjects' });

          this.setLoadingState(false);
        })
        .catch(e => {
          if (e.status === 400) {
            this.isErrorAuth = true;
          }
          this.setLoadingState(false)
        })
    }
  }
}
</script>

<style lang='scss'>
@import "./index";
</style>