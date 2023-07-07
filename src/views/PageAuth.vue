<template>
  <div id="app">
    <div class="page__wrapper">
      <BaseButton class="button__primary" :title="'Авторизироваться'" @onButtonClick="authorize"></BaseButton>
    </div>
    
    <div v-if="getLoadingState" class="section-items__wrapper">
      <SvgIcon :name="'loading-icon'" :isAnim="true"></SvgIcon>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

import { mapGetters, mapActions } from 'vuex';

import { AuthFunc } from '@/api/APIFunc';

export default {
  data() {
    return {}
  },
  components: {
    BaseButton, SvgIcon
  },
  computed: {
    ...mapGetters(['getLoadingState', 'getToken']),
  },
  watch: {},
  methods: {
    ...mapActions(['setToken']),
    ...mapActions(['setLoadingState']),

    authorize: function() {
      if (this.getToken) {
        return
      }

      this.setLoadingState(true)
      let urlAuth = "http://45.12.239.156:8081/api/login";

      let data = {
        "name": "Мартынов Владислав",
        "login": "martynov.v",
        "password": "jc63fk"
      };

      AuthFunc(urlAuth, data).then((data) => {
       this.setToken(data.token);
       this.setLoadingState(false)
      })
    },
  }
}
</script>

<style lang="scss">
.page__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-grow: 1;
}
.section-items__wrapper {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: $border-def-color;
}
</style>